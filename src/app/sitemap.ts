import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { tours } from "@/data/tours";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/tours", "/homestay", "/about", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const tourRoutes = tours.map((t) => ({
    url: `${site.url}/tours/${t.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...tourRoutes];
}
