export default function Gallery() {
  const roomImages = [
    "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2Fa57d26a32d1c49c0931625c6c4322b69?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2F46cde2f5cea642a384f5a792522b0fb5?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2F71dc3e24eb424d51abe8a12032076d0f?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2Fe21501bf5d334c8499c7da2ca58dd678?format=webp&width=800",
  ];

  const girlsImages = [
    "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2F4a07b3b0881345b2be52d5a0df98712e?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2F9b1b9f11d5e04fe7a97c29535880bd8a?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2F06c76eb55a584b8f847f08b28f7b8aa8?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2F06f4fb27d984481abcc12bd4e6291aac?format=webp&width=800",
  ];

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold">Gallery</h1>
      <p className="mt-2 text-muted-foreground">
        Explore our studios and treatment rooms.
      </p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Rooms</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roomImages.map((src, i) => (
            <img
              key={`room-${i}`}
              src={src}
              alt={`Room photo ${i + 1}`}
              className="w-full aspect-[4/3] object-cover rounded-lg border"
            />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Our Team</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {girlsImages.map((src, i) => (
            <img
              key={`girls-${i}`}
              src={src}
              alt={`Team member ${i + 1}`}
              className="w-full aspect-[4/3] object-cover rounded-lg border"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
