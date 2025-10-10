export default function Team() {
  const team = [
    {
      name: "Marina",
      role: "Remedial Therapist",
      img: "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2Fdb8a7936f4d14a19879d6d4945ec961b?format=webp&width=800",
      specialties: "Relaxation oil massage, Remedial, Trigger Point",
      experience: "2 Year",
      languages: "English, Chinese",
      bio: "Combines remedial methods with calming flow for balanced recovery and relaxation.",
    },
    {
      name: "Sara Park",
      role: "Therapeutic Specialist",
      img: "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2F59f5c96bebdd4387b0cf4e90be66463b?format=webp&width=800",
      specialties: "Aromatherapy, Full‑Body Relaxation",
      experience: "5 years",
      languages: "English, Korean",
      bio: "Creates a serene experience using essential oils and flowing techniques.",
    },
    {
      name: "Emily Brown",
      role: "Relaxation Therapist",
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60",
      specialties: "Relaxation, Prenatal",
      experience: "4 years",
      languages: "English",
      bio: "Soothing, nurturing style ideal for stress relief and better sleep.",
    },
  ];

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold">Our Team</h1>
      <p className="mt-2 text-muted-foreground max-w-2xl">
        Meet our friendly, professional therapists. We tailor every session to
        your needs and comfort.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m) => (
          <div key={m.name} className="rounded-xl border bg-card p-4">
            <img
              src={m.img}
              alt={m.name}
              className="w-full aspect-[4/3] object-cover rounded-lg"
            />
            <div className="mt-3 font-semibold">{m.name}</div>
            <div className="text-sm text-muted-foreground">{m.role}</div>
            <div className="mt-2 text-sm">
              <span className="font-medium">Specialties:</span> {m.specialties}
            </div>
            <div className="text-sm">
              <span className="font-medium">Experience:</span> {m.experience}
            </div>
            <div className="text-sm">
              <span className="font-medium">Languages:</span> {m.languages}
            </div>
            <p className="text-sm text-muted-foreground mt-2">{m.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
