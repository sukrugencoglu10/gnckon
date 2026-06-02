import type { Metadata } from "next";
import { site } from "./site-config";

export function buildMetadata(opts: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const description = opts.description ?? site.description;
  const url = `${site.url}${opts.path ?? ""}`;
  const image = opts.image ?? "/og.svg";
  return {
    title: opts.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description,
      url,
      siteName: site.name,
      locale: "tr_TR",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: opts.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description,
      images: [image],
    },
  };
}
