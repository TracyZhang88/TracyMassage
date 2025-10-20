import { Request, Response, Router } from "express";
import { z } from "zod";
import { sendSmsConfirmation } from "../sms";
import { getSupabaseServer } from "../db";

const router = Router();

const SYDNEY_TZ = "Australia/Sydney" as const;
function sydneyDateISO(d: Date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: SYDNEY_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}
function sydneyNowMinutes(d: Date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: SYDNEY_TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(d);
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  return h * 60 + m;
}

const LocationHours = {
  wyong: { start: 8, end: 22 },
  gosford: { start: 9, end: 21 },
} as const; // hours in 24h
const SlotInterval = 30; // minutes

const fallbackTherapists = [
  {
    id: "t1",
    name: "李杰",
    bio: "10 年资深理疗师，擅长深层组织与运动损伤修复",
  },
  { id: "t2", name: "王婷", bio: "中式推拿与经络理疗，注重舒缓与放松" },
  { id: "t3", name: "陈峰", bio: "足部反射区理疗与拔罐调理" },
];

const appointmentSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(5),
  email: z.string().email().optional().or(z.literal("")),
  notes: z.string().max(1000).optional().or(z.literal("")),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  time: z.string().regex(/^\d{2}:\d{2}$/), // HH:mm
  service: z.string().min(1),
  duration: z
    .number()
    .int()
    .positive()
    .refine((d) => [30, 60, 90].includes(d)),
  location: z.enum(["wyong", "gosford"]),
  therapistId: z.string().optional(),
});

export type Appointment = z.infer<typeof appointmentSchema> & { id: string };

// In-memory fallback store
const bookings: Appointment[] = [];

function toMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function fromMinutes(min: number) {
  const h = Math.floor(min / 60)
    .toString()
    .padStart(2, "0");
  const m = (min % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

function computeFreeSlots(
  location: "wyong" | "gosford",
  duration: number,
  dayBookings: Appointment[],
) {
  const hours = LocationHours[location];
  const start = hours.start * 60;
  const end = hours.end * 60;
  const slots: { time: string }[] = [];
  for (let t = start; t + duration <= end; t += SlotInterval) {
    slots.push({ time: fromMinutes(t) });
  }
  return slots.filter((s) => {
    const sStart = toMinutes(s.time);
    const sEnd = sStart + duration;
    return !dayBookings.some((b) => {
      const bStart = toMinutes(b.time);
      const bEnd = bStart + b.duration;
      return Math.max(sStart, bStart) < Math.min(sEnd, bEnd); // overlap
    });
  });
}

async function getTherapists() {
  const sb = getSupabaseServer();
  if (!sb) return fallbackTherapists;
  const { data, error } = await sb
    .from("therapists")
    .select("id,name,bio")
    .order("name");
  if (error || !data) return fallbackTherapists;
  return data as { id: string; name: string; bio?: string }[];
}

async function getBookingsByDate(date: string, location?: "wyong" | "gosford") {
  const sb = getSupabaseServer();
  if (!sb)
    return bookings.filter(
      (b) => b.date === date && (!location || (b as any).location === location),
    );
  // Try with location column if available
  let q = sb
    .from("appointments")
    .select(
      "id,name,phone,email,notes,date,time,service,duration,therapist_id,location",
    )
    .eq("date", date);
  if (location) q = q.eq("location", location);
  let { data, error } = await q;
  if (error) {
    // Fallback if location column does not exist
    const fb = await sb
      .from("appointments")
      .select(
        "id,name,phone,email,notes,date,time,service,duration,therapist_id",
      )
      .eq("date", date);
    data = fb.data as any;
  }
  if (!data) return [] as Appointment[];
  return (data as any[]).map((r: any) => ({
    id: r.id,
    name: r.name,
    phone: r.phone,
    email: r.email ?? undefined,
    notes: r.notes ?? undefined,
    date: r.date,
    time: r.time,
    service: r.service,
    duration: r.duration,
    therapistId: r.therapist_id ?? undefined,
    location: r.location as any,
  })) as Appointment[];
}

async function createBooking(appt: Omit<Appointment, "id">) {
  const sb = getSupabaseServer();
  if (!sb) {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const complete: Appointment = { ...appt, id };
    (complete as any).location = (appt as any).location;
    bookings.push(complete);
    return complete;
  }
  const payloadWithLocation: any = {
    name: appt.name,
    phone: appt.phone,
    email: appt.email ?? null,
    notes: appt.notes ?? null,
    date: appt.date,
    time: appt.time,
    service: appt.service,
    duration: appt.duration,
    therapist_id: (appt as any).therapistId ?? null,
    location: (appt as any).location,
  };
  let ins = await sb
    .from("appointments")
    .insert(payloadWithLocation)
    .select("id")
    .single();
  if (ins.error) {
    const payloadNoLocation = { ...payloadWithLocation };
    delete (payloadNoLocation as any).location;
    const retry = await sb
      .from("appointments")
      .insert(payloadNoLocation)
      .select("id")
      .single();
    if (retry.error) {
      throw new Error(`Supabase insert failed: ${retry.error.message}`);
    }
    ins = retry;
  }
  const data = ins.data as any;
  if (!data) throw new Error("Failed to create booking: no id returned");
  return { ...appt, id: data.id } as Appointment;
}

router.get("/therapists", async (_req: Request, res: Response) => {
  const list = await getTherapists();
  res.json(list);
});

router.get("/slots", async (req: Request, res: Response) => {
  const date = String(req.query.date || "");
  const duration = Number(req.query.duration || 60);
  const location = String(req.query.location || "");
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    ![30, 60, 90].includes(duration) ||
    !["wyong", "gosford"].includes(location)
  ) {
    return res.status(400).json({ error: "Invalid parameters" });
  }
  const dayBookings = await getBookingsByDate(date, location as any);
  const hours = LocationHours[location as "wyong" | "gosford"];
  const start = hours.start * 60;
  const end = hours.end * 60;
  const todayISO = sydneyDateISO();
  const nowMin = sydneyNowMinutes();
  const all = [] as { time: string; available: boolean; location: string }[];
  for (let t = start; t + duration <= end; t += SlotInterval) {
    const time = fromMinutes(t);
    const sStart = t;
    const sEnd = sStart + duration;
    const overlaps = dayBookings.some((b) => {
      const bStart = toMinutes(b.time);
      const bEnd = bStart + b.duration;
      return Math.max(sStart, bStart) < Math.min(sEnd, bEnd);
    });
    let available = !overlaps;
    if (date === todayISO && t < nowMin) available = false;
    all.push({ time, available, location });
  }
  res.json(all);
});

router.get("/", async (req: Request, res: Response) => {
  const date = req.query.date ? String(req.query.date) : undefined;
  if (date) {
    const list = await getBookingsByDate(date);
    return res.json(list);
  }
  const sb = getSupabaseServer();
  if (!sb) return res.json(bookings);
  let q = await sb
    .from("appointments")
    .select(
      "id,name,phone,email,notes,date,time,service,duration,therapist_id,location",
    );
  let rows = q.data as any[] | null;
  if (!rows) {
    const fb = await sb
      .from("appointments")
      .select(
        "id,name,phone,email,notes,date,time,service,duration,therapist_id",
      );
    rows = fb.data as any[] | null;
  }
  if (!rows) return res.json([]);
  const out = rows.map((r: any) => ({
    id: r.id,
    name: r.name,
    phone: r.phone,
    email: r.email ?? undefined,
    notes: r.notes ?? undefined,
    date: r.date,
    time: r.time,
    service: r.service,
    duration: r.duration,
    therapistId: r.therapist_id ?? undefined,
    location: r.location as any,
  })) as Appointment[];
  res.json(out);
});

router.post("/", async (req: Request, res: Response) => {
  const parse = appointmentSchema.safeParse(req.body);
  if (!parse.success) {
    return res
      .status(400)
      .json({ error: "Invalid payload", details: parse.error.flatten() });
  }
  const data = parse.data;
  const dayBookings = await getBookingsByDate(data.date, data.location as any);
  const available = computeFreeSlots(
    data.location as any,
    data.duration,
    dayBookings,
  ).some((s) => s.time === data.time);
  const todayISO = sydneyDateISO();
  const timeMin = toMinutes(data.time);
  const nowMin = sydneyNowMinutes();
  if (data.date === todayISO && timeMin < nowMin) {
    return res.status(409).json({ error: "Selected time has already passed" });
  }
  if (!available)
    return res
      .status(409)
      .json({ error: "Selected time is no longer available" });

  try {
    const saved = await createBooking({ ...data });
    const therapists = await getTherapists();
    const tn = therapists.find(
      (t) => t.id === (saved as any).therapistId,
    )?.name;
    try {
      await sendSmsConfirmation(saved as any, tn);
    } catch {}
    return res.status(201).json({ id: saved.id });
  } catch (e: any) {
    console.error("Create booking error:", e?.message || e);
    return res.status(500).json({ error: String(e?.message || e) });
  }
});

export default router;
