import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Optimisation is on: the project artwork is a 1.3MP PNG, and serving that
    // raw into a ~500px card slot costs more than the whole rest of the page.
    // Next resizes it and negotiates AVIF/WebP per request.
    // If this ever moves to `output: "export"`, set `unoptimized: true` here —
    // static export has no image optimiser to call.
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
