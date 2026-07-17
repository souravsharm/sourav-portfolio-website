import type { MetadataRoute } from "next";
import { defaultSitemap } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return defaultSitemap();
}

