import Image from "next/image";

export function ImageCard({ src, area }: { src: string; area: "img1" | "img2" }) {
  return (
    <div className="card group relative overflow-hidden p-1" style={{ gridArea: area }}>
      <div className="relative size-full overflow-hidden rounded-xl">
        <Image
          src={src}
          alt=""
          fill
          sizes="(min-width: 640px) 160px, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>
    </div>
  );
}
