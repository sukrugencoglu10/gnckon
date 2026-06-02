import type { MetadataRoute } from "next";
import { containers } from "@/lib/containers";
import { site } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/konteynerler",
    "/teklif-al",
    "/konteynerimi-sat",
    "/hakkimizda",
    "/iletisim",
  ].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = containers.map((c) => ({
    url: `${site.url}/konteynerler/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
