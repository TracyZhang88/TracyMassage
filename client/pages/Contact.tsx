import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="container py-12 space-y-8">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="text-muted-foreground max-w-3xl">
        We’re proud to serve you from two tranquil locations:
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <div className="font-semibold">Amazing massage Gosford</div>
          <div className="text-sm text-muted-foreground mt-2">
            Address: 135 Mann St, Gosford NSW 2250
          </div>
          <div className="text-sm mt-1">
            Opening hour: 9:00 AM – 9:00 PM, Monday to Sunday
          </div>
          <div className="text-sm mt-1">
            Contact:{" "}
            <a className="text-primary hover:underline" href="tel:0435291625">
              0435291625
            </a>{" "}
            to book.
          </div>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <div className="font-semibold">AAA massage at Wyong</div>
          <div className="text-sm text-muted-foreground mt-2">
            Address: 92-94 Pacific Highway, Wyong NSW 2259
          </div>
          <div className="text-sm mt-1">
            Opening hour: 8:00 AM – 10:00 PM, Monday to Sunday
          </div>
          <div className="text-sm mt-1">
            Contact:{" "}
            <a className="text-primary hover:underline" href="tel:0452648896">
              0452 648 896
            </a>{" "}
            to book.
          </div>
        </div>
      </div>

      <div className="max-w-3xl space-y-4 text-muted-foreground">
        <p>
          Whether you're seeking stress relief, muscle recovery, or a moment of
          peace, we’re here to help you feel your best.
        </p>
      </div>

      <div className="pt-4">
        <Link to="/" className="text-sm text-primary hover:underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
