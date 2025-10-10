import { Link } from "react-router-dom";

export default function Employment() {
  return (
    <div className="container py-12 space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Employment</h1>
        <p className="mt-2 text-muted-foreground max-w-3xl">
          We’re hiring friendly, professional massage therapists to join our
          teams in Wyong and Gosford. If you’re passionate about helping people
          feel their best, we’d love to hear from you.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <div className="font-semibold text-lg">
            Massage Therapist (Full‑time / Part‑time)
          </div>
          <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>
              Provide relaxation, deep tissue, Thai, and therapeutic treatments
            </li>
            <li>
              Deliver friendly, professional service with excellent hygiene
            </li>
            <li>
              Maintain clean, private rooms and assist with daily shop setup
            </li>
          </ul>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <div className="font-semibold text-lg">
            Senior Therapist / Trainer
          </div>
          <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Lead treatment quality and support onboarding/training</li>
            <li>Assist with service standards across both locations</li>
            <li>Opportunity for higher rates based on experience</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <div className="font-medium">What we offer</div>
          <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Clean, private rooms (some locations with couples’ rooms)</li>
            <li>Supportive team with 3–4 therapists on duty daily</li>
            <li>Steady client flow and flexible shifts</li>
            <li>Fair, on‑time pay</li>
          </ul>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <div className="font-medium">About you</div>
          <div className="mt-3 text-sm text-muted-foreground space-y-2">
            <p>Looking for Happy Massage Girls under 45 years old.</p>
            <p>Experience not required as we will train you if needed.</p>
            <p>Can start immediately, no pressure, come and try out.</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-card p-5">
        <div className="font-medium">How to apply</div>
        <p className="mt-2 text-sm text-muted-foreground">
          Call or message us to arrange a quick chat and trial shift:
        </p>
        <ul className="mt-3 text-sm text-muted-foreground space-y-1">
          <li>
            Wyong:{" "}
            <a className="text-primary hover:underline" href="tel:0452648896">
              0452 648 896
            </a>
          </li>
          <li>
            Gosford:{" "}
            <a className="text-primary hover:underline" href="tel:0435291625">
              0435 291 625
            </a>
          </li>
        </ul>
        <p className="mt-3 text-sm text-muted-foreground">
          You can also visit our{" "}
          <Link to="/contact" className="text-primary hover:underline">
            Contact Us
          </Link>{" "}
          page for addresses.
        </p>
      </section>
    </div>
  );
}
