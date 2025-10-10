export default function Gallery() {
  const images = [
    "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2Fa57d26a32d1c49c0931625c6c4322b69?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2F46cde2f5cea642a384f5a792522b0fb5?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2F9268a3912ef241fcbcac5467ea2ea1b6?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2F34d799f4dc5743878a0c68ce4b76da8e?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2F71dc3e24eb424d51abe8a12032076d0f?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Fc1d3c746f2fe41db8552730b9a805170%2Fe21501bf5d334c8499c7da2ca58dd678?format=webp&width=800",
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
      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Studio photo ${i + 1}`}
            className={`w-full aspect-[4/3] object-cover rounded-lg border ${i === 2 || i === 3 ? "transform rotate-90 lg:mt-24" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
