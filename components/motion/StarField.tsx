// Ambient animated background — drifting stars + occasional shooting streaks.
// Runs continuously, independent of scroll. Positions are generated once at
// module load with a seeded PRNG so server and client render identically
// (no hydration mismatch) and it stays a pure CSS animation (cheap).

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20240717);

const stars = Array.from({ length: 44 }, () => {
  const size = 1 + rand() * 2.2;
  return {
    left: `${rand() * 100}%`,
    top: `${rand() * 100}%`,
    size,
    twinkleDuration: `${3 + rand() * 5}s`,
    twinkleDelay: `${rand() * 6}s`,
    driftDuration: `${6 + rand() * 8}s`,
  };
});

const shootingStars = Array.from({ length: 3 }, (_, index) => ({
  left: `${10 + rand() * 60}%`,
  top: `${rand() * 40}%`,
  duration: `${6 + rand() * 3}s`,
  delay: `${index * 5 + rand() * 6}s`,
}));

export function StarField() {
  return (
    <div aria-hidden className="starfield pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {stars.map((star, index) => (
        <span
          key={`star-${index}`}
          className="absolute rounded-full bg-foreground"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animation: `star-twinkle ${star.twinkleDuration} ease-in-out ${star.twinkleDelay} infinite, star-drift ${star.driftDuration} ease-in-out infinite alternate`,
          }}
        />
      ))}

      {shootingStars.map((shooting, index) => (
        <span
          key={`shooting-${index}`}
          className="absolute h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent"
          style={{
            left: shooting.left,
            top: shooting.top,
            opacity: 0,
            animation: `shooting-star ${shooting.duration} ease-in ${shooting.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
