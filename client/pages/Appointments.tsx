import BookingWidget from "@/components/BookingWidget";

export default function Appointments() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold">Online Booking</h1>
      <p className="mt-2 text-muted-foreground">Choose your location, date and time, then fill in your details to book.</p>
      <div className="mt-8 max-w-3xl">
        <BookingWidget />
      </div>
    </div>
  );
}
