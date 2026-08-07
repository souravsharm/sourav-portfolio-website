import { Play } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Real artwork for a project, in place of the generated diagram.
 *
 * When `videoHref` is set the whole poster becomes the play control — which is
 * what a thumbnail already looks like, so the affordance matches the image
 * instead of fighting it.
 */
export function ProjectPoster({
  src,
  alt,
  videoHref,
  className,
}: {
  src: string;
  alt: string;
  videoHref?: string;
  className?: string;
}) {
  const frame = cn(
    "group/poster relative block overflow-hidden rounded-xl border border-[rgb(var(--c-accent)/0.25)]",
    className,
  );

  const inner = (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        // The card is roughly half the shell on desktop and near-full width on
        // phones; this keeps the optimiser from serving a 1365px asset to a
        // 400px slot.
        sizes="(max-width: 1024px) 92vw, 44vw"
        className="object-cover transition-transform duration-700 ease-out group-hover/poster:scale-[1.04]"
      />

      {videoHref ? (
        <>
          {/* Scrim: the play badge needs a consistent backdrop regardless of
              what happens to be behind it in the frame. */}
          <span
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(0_0_0/0.45),rgb(0_0_0/0.15)_60%,transparent)]"
          />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/45 backdrop-blur-sm transition-transform duration-500 ease-out group-hover/poster:scale-110"
          >
            <Play className="ml-0.5 h-5 w-5 fill-white text-white" />
          </span>
        </>
      ) : null}
    </>
  );

  if (!videoHref) {
    return (
      <div className={frame}>
        {inner}
      </div>
    );
  }

  return (
    <a href={videoHref} target="_blank" rel="noopener noreferrer" className={frame} aria-label={`${alt} — play video`}>
      {inner}
    </a>
  );
}
