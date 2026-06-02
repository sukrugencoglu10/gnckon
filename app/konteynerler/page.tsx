import { Suspense } from "react";
import { ContainerCard } from "@/components/ContainerCard";
import { ContainerFilters } from "@/components/ContainerFilters";
import { CtaBanner } from "@/components/CtaBanner";
import { containers, type ContainerType } from "@/lib/containers";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Satılık Konteynerler — Stok Listesi",
  description:
    "Stoktaki tüm satılık yük konteynerleri. 20 ft, 40 ft, High Cube, reefer ve flat rack konteynerler — filtreleyin, WhatsApp'tan fiyat alın.",
  path: "/konteynerler",
});

interface PageProps {
  searchParams: { tip?: string; durum?: string };
}

export default function ListPage({ searchParams }: PageProps) {
  const tip = searchParams.tip as ContainerType | undefined;
  const durum = searchParams.durum;

  const filtered = containers.filter((c) => {
    if (tip && tip !== ("all" as ContainerType) && c.type !== tip) return false;
    if (durum && durum !== "all" && c.condition !== durum) return false;
    return true;
  });

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Anasayfa", item: site.url },
      { "@type": "ListItem", position: 2, name: "Konteynerler", item: `${site.url}/konteynerler` },
    ],
  };

  return (
    <>
      <section className="border-b border-black/5 bg-ink-900 text-white">
        <div className="container-x py-10">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Satılık Konteynerler</h1>
          <p className="mt-2 text-ink-400">
            {filtered.length} konteyner listeleniyor. Hızlı filtre ile arama yapın veya WhatsApp'tan ulaşın.
          </p>
        </div>
      </section>

      <section className="container-x py-8">
        <Suspense fallback={<div className="card h-20 animate-pulse" />}>
          <ContainerFilters />
        </Suspense>

        {filtered.length === 0 ? (
          <div className="card mt-6 p-8 text-center">
            <p className="text-ink-600">Bu kriterlerle eşleşen konteyner bulunamadı.</p>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <ContainerCard key={c.slug} c={c} />
            ))}
          </div>
        )}
      </section>

      <CtaBanner />
      <JsonLd data={breadcrumb} />
    </>
  );
}
