import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import {
  containers,
  getContainer,
  similarContainers,
} from "@/lib/containers";
import { telLink, waForContainer } from "@/lib/whatsapp";
import { site } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { ContainerCard } from "@/components/ContainerCard";
import { LeadForm } from "@/components/LeadForm";
import { JsonLd } from "@/components/JsonLd";
import { CtaBanner } from "@/components/CtaBanner";

export function generateStaticParams() {
  return containers.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const c = getContainer(params.slug);
  if (!c) return buildMetadata({ title: "Konteyner bulunamadı" });
  return buildMetadata({
    title: `${c.title} — Fiyat İçin WhatsApp`,
    description: `${c.shortDesc} ${c.typeLabel}, ${c.city}. ${site.name} ile anında fiyat ve teslimat.`,
    path: `/konteynerler/${c.slug}`,
    image: c.image,
  });
}

export default function ContainerDetailPage({ params }: { params: { slug: string } }) {
  const c = getContainer(params.slug);
  if (!c) notFound();
  const similar = similarContainers(c.slug, 3);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: c.title,
    description: c.description,
    image: `${site.url}${c.image}`,
    sku: c.slug,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `${site.url}/konteynerler/${c.slug}`,
      seller: { "@type": "Organization", name: site.legalName },
    },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Anasayfa", item: site.url },
      { "@type": "ListItem", position: 2, name: "Konteynerler", item: `${site.url}/konteynerler` },
      { "@type": "ListItem", position: 3, name: c.title, item: `${site.url}/konteynerler/${c.slug}` },
    ],
  };

  return (
    <>
      <section className="container-x py-6 md:py-10">
        <nav className="mb-4 text-xs text-ink-500">
          <Link href="/" className="hover:underline">Anasayfa</Link>
          <span className="mx-1">/</span>
          <Link href="/konteynerler" className="hover:underline">Konteynerler</Link>
          <span className="mx-1">/</span>
          <span className="text-ink-700">{c.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-1">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-700/5 ring-1 ring-black/5 lg:aspect-[16/9] max-w-4xl mx-auto">
              <Image
                src={c.image}
                alt={c.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 100vw"
                className="object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase text-ink-800 ring-1 ring-black/5">
                {c.condition === "yeni" ? "Yeni" : "2. El"}
              </span>
            </div>

            <div className="mt-8 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 text-sm text-ink-500">
                <span>{c.typeLabel}</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {c.city}
                </span>
              </div>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
                {c.title}
              </h1>
              <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-wa/10 px-5 py-3 text-base font-bold text-wa-dark">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
                </svg>
                Fiyat bilgisi için WhatsApp'tan ulaşın
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={waForContainer(c.slug, c.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex flex-1 items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-xl bg-wa px-6 py-4 text-base font-bold text-white shadow-lg shadow-wa/25 transition hover:-translate-y-0.5 hover:bg-wa-dark hover:shadow-xl hover:shadow-wa/35"
                >
                  <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-white/20">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
                    </svg>
                  </span>
                  WhatsApp ile Fiyat Al
                  <span aria-hidden className="pointer-events-none absolute -left-12 top-0 h-full w-12 -skew-x-12 bg-white/25 opacity-0 transition-all duration-700 group-hover:left-[110%] group-hover:opacity-100" />
                </a>
                <a
                  href={telLink()}
                  className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl border-2 border-brand-600 bg-white px-6 py-4 text-base font-bold text-brand-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-50 hover:shadow-md"
                >
                  <Phone className="h-4 w-4" /> Hemen Ara
                </a>
              </div>

              <p className="mt-8 leading-relaxed text-ink-700 text-lg">{c.description}</p>

              <h2 className="mt-10 text-xl font-bold text-ink-900">Teknik Özellikler</h2>
              <dl className="mt-4 grid grid-cols-1 overflow-hidden rounded-xl ring-1 ring-black/5 sm:grid-cols-2">
                {Object.entries(c.specs).map(([k, v], i) => (
                  <div
                    key={k}
                    className={`flex justify-between gap-4 bg-white px-5 py-4 text-sm ${
                      i % 2 ? "" : "sm:border-r border-black/5"
                    } border-b border-black/5`}
                  >
                    <dt className="text-ink-500">{k}</dt>
                    <dd className="text-right font-medium text-ink-900">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-16 mx-auto w-full max-w-4xl shadow-2xl ring-1 ring-black/5 rounded-2xl">
          <LeadForm variant="buyer" defaultType={c.type} />
        </div>
      </section>

      {similar.length > 0 && (
        <section className="container-x py-10">
          <h2 className="mb-6 text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">
            Benzer Konteynerler
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((s) => (
              <ContainerCard key={s.slug} c={s} />
            ))}
          </div>
        </section>
      )}

      <CtaBanner />

      <JsonLd data={productLd} />
      <JsonLd data={breadcrumb} />
    </>
  );
}
