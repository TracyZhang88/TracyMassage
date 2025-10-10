import type { Appointment } from "./routes/appointments";

export async function sendSmsConfirmation(appt: Appointment, therapistName?: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;

  if (!sid || !token || !from) {
    return { sent: false, reason: "TWILIO env not configured" } as const;
  }

  const { default: Twilio } = await import("twilio");
  const client = Twilio(sid, token);

  const [y, m, d] = appt.date.split("-");
  const ddmmyyyy = `${d}/${m}/${y}`;
  const loc = (appt as any).location as "wyong" | "gosford" | undefined;
  const where = loc === "wyong" ? "AAA Amazing Massage (Wyong)" : loc === "gosford" ? "Amazing Massage Gosford" : "Amazing Massage";
  const tn = therapistName || (appt as any).therapistId || "therapist";
  const msg = `Your appointment at ${where}${tn ? ` with ${tn}` : ""} is confirmed for ${ddmmyyyy} ${appt.time}. Duration: ${appt.duration} minutes.`;

  await client.messages.create({
    body: msg,
    from,
    to: appt.phone,
  });
  return { sent: true } as const;
}
