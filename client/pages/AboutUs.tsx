import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AboutUs() {
  return (
    <div className="container py-12 space-y-10">
      <section className="max-w-3xl">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="mt-4 text-muted-foreground">
          Discover a sanctuary of relaxation and rejuvenation at our massage
          studios. We offer a wide range of professional therapies tailored to
          your needs, including relaxation massage, Thai massage, rehabilitation
          massage, full‑body essential oil relaxation, deep tissue, therapeutic
          massage, hot stone, and our signature Chinese massage. Each treatment
          is designed to ease tension, restore balance, and promote overall
          wellbeing.
        </p>
        <p className="mt-3 text-muted-foreground">
          We take pride in maintaining a clean, private environment with
          individual massage rooms for your comfort, and select locations
          offering couples’ rooms. Showers and restrooms are available for your
          convenience.
        </p>
        <p className="mt-3 text-muted-foreground">
          Our carefully selected and trained therapists provide friendly,
          professional service. With 3–4 team members on duty daily, we ensure
          attentive care for every guest.
        </p>
        <p className="mt-3 text-muted-foreground">
          Pricing is simple and accessible: $50 for 30 minutes, $70 for 45
          minutes, and $80 for 60 minutes.
        </p>
        <ul className="mt-4 text-sm text-muted-foreground list-disc pl-5">
          <li>Wyong: 8:00 AM – 10:00 PM, Monday to Sunday</li>
          <li>Gosford: 9:00 AM – 9:00 PM, Monday to Sunday</li>
        </ul>
        <div className="mt-6 flex items-center gap-3">
          <Button asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/team">Our Team</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
