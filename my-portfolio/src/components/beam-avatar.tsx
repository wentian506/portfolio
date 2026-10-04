import Image from "next/image";

/** Small square photo with thin "blueprint" lines and a travelling light beam. */
export function BeamAvatar({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative size-20 shrink-0">
      {/* top line + moving beam */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-4 -right-14 -left-32 h-px overflow-hidden bg-linear-to-r from-transparent via-foreground/15 to-foreground/5"
      >
        <span className="absolute inset-y-0 left-0 w-2/5 animate-beam bg-linear-to-r from-transparent via-rose-500 to-sky-400" />
      </span>
      {/* right line + moving beam */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-4 -right-4 -bottom-14 w-px overflow-hidden bg-linear-to-b from-foreground/15 via-foreground/10 to-transparent"
      >
        <span className="absolute inset-x-0 top-0 h-2/5 animate-beam-y bg-linear-to-b from-transparent via-sky-400 to-violet-500" />
      </span>
      {/* small crossing ticks */}
      <span aria-hidden className="pointer-events-none absolute -top-12 left-8 h-12 w-px bg-linear-to-b from-transparent to-foreground/15" />
      <span aria-hidden className="pointer-events-none absolute top-10 -right-16 h-px w-16 bg-linear-to-l from-transparent to-foreground/15" />

      <Image
        src={src}
        alt={alt}
        width={160}
        height={160}
        priority
        className="relative size-20 rounded-[3px] object-cover ring-1 ring-border"
      />
    </div>
  );
}
