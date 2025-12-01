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
      name: "Angela - at Gosford",
      role: "Therapeutic Specialist",
      img: "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2F59f5c96bebdd4387b0cf4e90be66463b?format=webp&width=800",
      specialties: "Aromatherapy, Full‑Body Relaxation",
      experience: "3 Years",
      languages: "English, Mandarin, Cantonese",
      bio: "Creates a serene experience using essential oils and flowing techniques.",
    },
    {
      name: "Ada",
      role: "Relaxation Therapist",
      img: "https://cdn.builder.io/api/v1/image/assets%2F1534224983ee4fa8aa247727ffcbd7d6%2Ff0aa9169550a40c487d88f7651801561?format=webp&width=800",
      specialties: "Oil massage, Relaxation massage",
      experience: "4 years",
      languages: "English, Chinese",
      bio: "Soothing, nurturing style ideal for stress relief and better sleep.",
    },
    {
      name: "Cece - at Wyong",
      role: "Deep Tissue Specialist",
      img: "https://cdn.builder.io/api/v1/image/assets%2F1534224983ee4fa8aa247727ffcbd7d6%2Fb4fc5ee35b744ac5a9f2624aee23ca5d?format=webp&width=800",
      specialties: "Deep Tissue, Trigger Point, Myofascial Release",
      experience: "6 years",
      languages: "English, Mandarin",
      bio: "Focused, restorative work targeting chronic tension and posture-related discomfort.",
    },
    {
      name: "Amy",
      role: "Sports & Recovery Therapist",
      img: "https://cdn.builder.io/api/v1/image/assets%2F1534224983ee4fa8aa247727ffcbd7d6%2Ff448669e854242a6b21d4e157b7ef82a?format=webp&width=800",
      specialties: "Relaxation massage, Oil massage",
      experience: "3 years",
      languages: "English, Mandarin",
      bio: "Energizing techniques to aid mobility, reduce soreness, and speed recovery.",
    },
    {
      name: "Cindy - at Wyong",
      role: "Hot Stone & Relaxation",
      img: "https://cdn.builder.io/api/v1/image/assets%2F1534224983ee4fa8aa247727ffcbd7d6%2F329dc96562f248618106fd7111598c27?format=webp&width=800",
      specialties: "Hot Stone, Aromatherapy, Calming Flow",
      experience: "4 years",
      languages: "English, Cantonese",
      bio: "Gentle, soothing approach perfect for deep relaxation and stress relief.",
    },
    {
      name: "Leena - at Wyong",
      role: "Remedial Therapist",
      img: "https://cdn.builder.io/api/v1/image/assets%2F1534224983ee4fa8aa247727ffcbd7d6%2F11be40bc59c14b9aba2c753446a68c03?format=webp&width=800",
      specialties: "Relaxation oil massage, Remedial, Trigger Point",
      experience: "2 Year",
      languages: "English, Thai",
      bio: "Combines remedial methods with calming flow for balanced recovery and relaxation.",
    },
    {
      name: "Gigi - at Gosford",
      role: "Relaxation Therapist",
      img: "https://cdn.builder.io/api/v1/image/assets%2F1534224983ee4fa8aa247727ffcbd7d6%2F694071ff967d467da3ec4bad4669b980?format=webp&width=800",
      specialties: "Oil massage, Relaxation massage",
      experience: "4 years",
      languages: "English, Cantonese, Mandarin",
      bio: "Soothing, nurturing style ideal for stress relief and better sleep.",
    },
    {
      name: "Ada",
      role: "Relaxation Therapist",
      img: "https://cdn.builder.io/api/v1/image/assets%2F1534224983ee4fa8aa247727ffcbd7d6%2Ff0aa9169550a40c487d88f7651801561?format=webp&width=800",
      specialties: "Oil massage, Relaxation massage",
      experience: "4 years",
      languages: "English, Chinese",
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
