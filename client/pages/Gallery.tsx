export default function Gallery() {
  const row1 = [
    "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2Fa57d26a32d1c49c0931625c6c4322b69?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2F46cde2f5cea642a384f5a792522b0fb5?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1534224983ee4fa8aa247727ffcbd7d6%2F361bcaed9a94461294a68f359a3074e8?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1534224983ee4fa8aa247727ffcbd7d6%2F22279dc45a5b410d8d8615a4ce40c5e4?format=webp&width=800",
  ];

  const row2 = [
    "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2F4a07b3b0881345b2be52d5a0df98712e?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2F9b1b9f11d5e04fe7a97c29535880bd8a?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2F06c76eb55a584b8f847f08b28f7b8aa8?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2F06f4fb27d984481abcc12bd4e6291aac?format=webp&width=800",
  ];

  const photos = [
    { src: row1[0], label: "Studio photo 1" },
    { src: row1[1], label: "Studio photo 2" },
    { src: row1[2], label: "Studio photo 5" },
    { src: row1[3], label: "Studio photo 6" },
    { src: row2[0], label: "Studio photo 7" },
    { src: row2[1], label: "Studio photo 8" },
    { src: row2[2], label: "Studio photo 9" },
    { src: row2[3], label: "Studio photo 10" },
  ];

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold">Gallery</h1>
      <p className="mt-2 text-muted-foreground">
        Explore our studios and treatment rooms.
      </p>
      <div className="mt-8 space-y-4">
        <div className="grid gap-4 grid-cols-4">
          {row1.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Studio photo ${[1, 2, 5, 6][i]}`}
              className="w-full aspect-[4/3] object-cover rounded-lg border"
            />
          ))}
        </div>
        <div className="grid gap-4 grid-cols-4">
          {row2.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Studio photo ${[7, 8, 9, 10][i]}`}
              className="w-full aspect-[4/3] object-cover rounded-lg border"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
