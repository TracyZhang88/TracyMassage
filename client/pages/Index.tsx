import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Index() {
  const services = [
    {
      title: "Relaxation Massage",
      desc: "Ease stress and unwind",
      img: "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2F20fd9940dfb840dd93fdfc8d2de410ca?format=webp&width=1200",
    },
    {
      title: "Deep Tissue",
      desc: "Target muscle tension and soreness",
      img: "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2Fb9dc36702fa94a8bb2db6feef8a0ef71?format=webp&width=1200",
    },
    {
      title: "Oil Massage",
      desc: "Full‑body essential oil massage",
      img: "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2F4120da8fbd704b3aa474b93efe9a9c97?format=webp&width=800",
    },
    {
      title: "Relaxation Massage",
      desc: "Gentle, full‑body relaxation",
      img: "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2F9e85a4c9480a49208c0cf0cceebb1851?format=webp&width=800",
    },
  ];

  return (
    <div>
      <section className="relative overflow-hidden">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2F71dc3e24eb424d51abe8a12032076d0f?format=webp&width=1600"
          alt="Studio background"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-background/50 to-background/20" />
        <div className="container relative z-10 py-16 md:py-24">
          <div>
            <div className="space-y-1">
              <p className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Amazing massage Gosford
              </p>
              <p className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                AAA massage at Wyong
              </p>
            </div>
            <p className="mt-4 text-lg text-muted-foreground max-w-prose">
              Discover a sanctuary of relaxation and rejuvenation at our massage
              studios. We offer a wide range of professional therapies tailored
              to your needs, including relaxation massage, Thai massage,
              rehabilitation massage, full body essential oil relaxation, deep
              tissue, therapeutic massage, hot stone, and our signature Chinese
              massage. Each treatment is designed to ease tension, restore
              balance, and promote overall wellbeing.
              <br />
              <br />
              We take pride in maintaining a clean, private environment with
              individual massage rooms for your comfort, and select locations
              offering couples’ rooms. Showers and restrooms are available for
              your convenience.
              <br />
              <br />
              Our carefully selected and trained therapists provide friendly,
              professional service. With 3–4 team members on duty daily, we
              ensure attentive care for every guest.
              <br />
              <br />
              Pricing is simple and accessible: $50 for 30 minutes, $70 for 45
              minutes, and $80 for 60 minutes.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Button asChild>
                <Link to="/contact">Book Now</Link>
              </Button>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary" />
                Experienced therapists
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary" />
                Clean, private rooms
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary" />
                Contact us to book
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary" />
                Friendly service
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <h2 className="text-2xl font-bold">Our Locations</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border bg-card p-5">
            <div className="font-semibold">AAA Amazing Massage (Wyong)</div>
            <div className="text-sm text-muted-foreground mt-1">
              92 Pacific Hwy, Wyong NSW 2259
            </div>
            <div className="text-sm mt-1">
              Open: 8:00 AM – 10:00 PM, Monday to Sunday
            </div>
            <div className="text-sm mt-1">
              Phone:{" "}
              <a className="text-primary hover:underline" href="tel:0452648896">
                0452 648 896
              </a>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <div className="font-semibold">Amazing Massage Gosford</div>
            <div className="text-sm text-muted-foreground mt-1">
              135 Mann St, Gosford NSW 2250
            </div>
            <div className="text-sm mt-1">
              Open: 9:00 AM – 9:00 PM, Monday to Sunday
            </div>
            <div className="text-sm mt-1">
              Phone:{" "}
              <a className="text-primary hover:underline" href="tel:0435291625">
                0435 291 625
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <h2 className="text-2xl font-bold">Popular Services</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {services.map(({ title, desc, img }, i) => (
            <div
              key={`${title}-${i}`}
              className="rounded-xl border bg-card p-5 hover:shadow-sm transition"
            >
              <img
                src={img}
                alt={title}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <div className="font-medium">{title}</div>
              <div className="text-sm text-muted-foreground mt-1">{desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
