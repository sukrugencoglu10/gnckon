import { Suspense } from "react";
import Link from "next/link";
import { ContainerIllustration } from "@/components/ContainerIllustration";
import { ContainerCard } from "@/components/ContainerCard";
import { ContainerFilters } from "@/components/ContainerFilters";
import { ContainerGridSkeleton } from "@/components/ContainerCardSkeleton";
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

async function FilteredContainerList({ searchParams }: PageProps) {
  const tip = searchParams.tip as ContainerType | undefined;
  const durum = searchParams.durum;

  // UX Gösterimi için API gecikmesi simülasyonu (Gerçek DB'ye geçildiğinde kaldırılabilir)
  await new Promise((resolve) => setTimeout(resolve, 400));

  const filtered = containers.filter((c) => {
    if (tip && tip !== ("all" as ContainerType) && c.type !== tip) return false;
    if (durum && durum !== "all" && c.condition !== durum) return false;
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="card mt-6 flex flex-col items-center justify-center p-12 text-center ring-1 ring-black/5 bg-white shadow-sm">
        <div className="relative mb-6 h-32 w-48 opacity-40 grayscale mix-blend-multiply">
          <ContainerIllustration image="/images/containers/20ft-standart.svg" className="h-full w-full object-contain" />
        </div>
        <h3 className="text-xl font-bold text-ink-900">Sonuç Bulunamadı</h3>
        <p className="mt-2 max-w-md text-base text-ink-500">
          Aradığınız kriterde konteyner bulunamadı. Lütfen filtreleri temizleyin veya özel üretim için bizimle iletişime geçin.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/konteynerler" className="btn-primary">
            Filtreleri Sıfırla
          </Link>
          <Link href="/iletisim" className="btn-outline">
            İletişime Geç
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((c) => (
        <ContainerCard key={c.slug} c={c} />
      ))}
    </div>
  );
}

export default function ListPage({ searchParams }: PageProps) {
  const suspenseKey = JSON.stringify(searchParams);

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
      <section className="border-b border-black/5 bg-slate-50">
        <div className="container-x py-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">Satılık Konteynerler</h1>
          <p className="mt-2 text-ink-600">
            Hızlı filtre ile arama yapın veya güncel stoklar için WhatsApp'tan ulaşın.
          </p>
        </div>
      </section>

      <section className="container-x py-8">
        <Suspense fallback={<div className="card h-20 animate-pulse" />}>
          <ContainerFilters />
        </Suspense>

        <Suspense key={suspenseKey} fallback={<ContainerGridSkeleton />}>
          <FilteredContainerList searchParams={searchParams} />
        </Suspense>
      </section>

      <CtaBanner />
      <JsonLd data={breadcrumb} />
    </>
  );
}
