import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { enAU } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type {
  AppointmentRequest,
  AppointmentSlot,
  Location,
} from "@shared/api";

const LOCATIONS: { id: Location; label: string }[] = [
  { id: "wyong", label: "AAA Amazing Massage (Wyong)" },
  { id: "gosford", label: "Amazing Massage Gosford" },
];

const SERVICES = [
  { id: "relax", label: "Relaxation Massage" },
  { id: "deep", label: "Deep Tissue" },
  { id: "foot", label: "Foot Massage" },
  { id: "cupping", label: "Cupping" },
];

const DURATIONS = [30, 60, 90] as const;

export default function BookingWidget({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [location, setLocation] = useState<Location>("wyong");
  const [service, setService] = useState<string>(SERVICES[0].id);
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]>(60);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const queryKey = useMemo(
    () => ["slots", date ? format(date, "yyyy-MM-dd") : "", duration, location],
    [date, duration, location],
  );

  const {
    data: slots,
    refetch,
    isFetching,
  } = useQuery<AppointmentSlot[]>({
    queryKey,
    queryFn: async () => {
      if (!date) return [];
      const res = await fetch(
        `/api/appointments/slots?date=${format(date, "yyyy-MM-dd")}&duration=${duration}&location=${location}`,
      );
      if (!res.ok) throw new Error("Unable to load available times");
      return res.json();
    },
  });

  useEffect(() => {
    setSelectedTime(null);
    void refetch();
  }, [date, duration, location, refetch]);

  const mutation = useMutation({
    mutationFn: async (payload: AppointmentRequest) => {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        let msg = "Booking failed, please try again";
        try {
          const data = await res.json();
          if (data?.error) msg = String(data.error);
          if (data?.details?.fieldErrors) {
            const fields = Object.entries<any>(
              data.details.fieldErrors,
            ).flatMap(([k, v]) =>
              Array.isArray(v) ? v.map((m) => `${k}: ${m}`) : [],
            );
            if (fields.length) msg = `${msg} — ${fields.join("; ")}`;
          }
        } catch {}
        throw new Error(msg);
      }
      return (await res.json()) as { id: string };
    },
    onSuccess: () => {
      toast.success("Booking submitted! We'll confirm with you shortly.");
      setSelectedTime(null);
    },
    onError: (e: any) => toast.error(e?.message ?? "Booking failed"),
  });

  return (
    <Card
      className={cn(
        "shadow-xl border-none",
        compact ? "" : "backdrop-blur bg-card/90",
      )}
    >
      <CardHeader>
        <CardTitle className="text-xl">Online Booking</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Location</Label>
            <Select
              value={location}
              onValueChange={(v) => setLocation(v as Location)}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {LOCATIONS.map((l) => (
                  <SelectItem key={l.id} value={l.id}>
                    {l.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Service</Label>
            <Select value={service} onValueChange={setService}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                {SERVICES.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Duration</Label>
            <Select
              value={String(duration)}
              onValueChange={(v) => setDuration(Number(v) as any)}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {DURATIONS.map((d) => (
                  <SelectItem key={d} value={String(d)}>
                    {d} minutes
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  {date ? (
                    format(date, "PPP", { locale: enAU })
                  ) : (
                    <span>Select date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date(new Date().toDateString())}
                  initialFocus
                  locale={enAU}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Available times</Label>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {isFetching && (
              <div className="col-span-full text-sm text-muted-foreground">
                Loading…
              </div>
            )}
            {!isFetching && slots?.some((s) => s.available) === false && (
              <div className="col-span-full text-sm text-muted-foreground">
                No times available for this day
              </div>
            )}
            {slots?.map((s) => {
              const disabled = !s.available;
              return (
                <button
                  key={s.time}
                  onClick={() => !disabled && setSelectedTime(s.time)}
                  disabled={disabled}
                  className={cn(
                    "px-3 py-2 text-sm rounded-md border transition",
                    disabled
                      ? "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                      : selectedTime === s.time
                        ? "bg-primary text-primary-foreground"
                        : "bg-background hover:bg-secondary",
                  )}
                >
                  {s.time}
                </button>
              );
            })}
          </div>
        </div>

        <BookingForm
          disabled={!selectedTime || !date}
          onSubmit={(payload) => mutation.mutate(payload)}
          dateISO={date ? format(date, "yyyy-MM-dd") : ""}
          time={selectedTime || ""}
          service={service}
          duration={duration}
          location={location}
          submitting={mutation.isPending}
        />
      </CardContent>
    </Card>
  );
}

function BookingForm({
  disabled,
  onSubmit,
  dateISO,
  time,
  service,
  duration,
  location,
  submitting,
}: {
  disabled: boolean;
  onSubmit: (payload: AppointmentRequest) => void;
  dateISO: string;
  time: string;
  service: string;
  duration: number;
  location: Location;
  submitting: boolean;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          name,
          phone,
          email,
          notes,
          date: dateISO,
          time,
          service,
          duration,
          location,
        });
      }}
    >
      <div className="space-y-2">
        <Label>Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          disabled={disabled || submitting}
        />
      </div>
      <div className="space-y-2">
        <Label>Phone</Label>
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Mobile or landline"
          required
          disabled={disabled || submitting}
        />
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label>Email (optional)</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="For booking confirmation"
          disabled={disabled || submitting}
        />
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label>Comment (optional)</Label>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Include therapist name, allergies, and preferences if any"
          disabled={disabled || submitting}
        />
      </div>
      <div className="md:col-span-2 flex items-center justify-between gap-3">
        <div className="text-sm text-muted-foreground">
          {dateISO && time ? (
            <>
              Selected: {dateISO} {time} · {duration} minutes ·{" "}
              {serviceLabel(service)} · {locationLabel(location)}
            </>
          ) : (
            <>Please select a date and time</>
          )}
        </div>
        <Button type="submit" disabled={disabled || submitting}>
          {submitting ? "Submitting…" : "Confirm booking"}
        </Button>
      </div>
    </form>
  );
}

function serviceLabel(id: string) {
  return SERVICES.find((s) => s.id === id)?.label ?? id;
}

function locationLabel(id: Location) {
  return LOCATIONS.find((l) => l.id === id)?.label ?? id;
}
