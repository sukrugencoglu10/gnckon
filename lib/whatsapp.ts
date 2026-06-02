import { site } from "./site-config";

export function waLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function telLink() {
  return `tel:${site.phoneRaw}`;
}

export function waForContainer(slug: string, title: string) {
  return waLink(
    `Merhaba, "${title}" (${slug}) konteyner hakkında fiyat ve stok bilgisi almak istiyorum.`,
  );
}
