import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { ValueProps } from "@/components/ValueProps";
import { ContainerCard } from "@/components/ContainerCard";
import { FAQ } from "@/components/FAQ";
import { CtaBanner } from "@/components/CtaBanner";
import { WarehouseMap } from "@/components/WarehouseMap";
import { featuredContainers } from "@/lib/containers";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: `Satılık Yük Konteyneri — 20 ft, 40 ft, Reefer, Flat Rack | ${site.name}`,
  description:
    "Yeni ve 2. el satılık yük konteynerleri. 20 ft, 40 ft, High Cube, soğutuculu reefer ve flat rack konteyner. WhatsApp'tan anında fiyat, Türkiye geneli teslimat.",
  path: "/",
});

export default function HomePage() {
  const featured = featuredContainers();
  return (
    <>
      <Hero />
      <WarehouseMap />
      <TrustStrip />
      <ValueProps />

      <section id="urunler" className="container-x py-6 md:py-10">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
              Öne Çıkan Konteynerler
            </h2>
            <p className="mt-2 text-ink-500">Stokta olan ve hızlı sevk edilebilir konteynerler.</p>
          </div>
          <Link href="/konteynerler" className="hidden btn-outline sm:inline-flex">
            Tümünü Gör <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <ContainerCard key={c.slug} c={c} />
          ))}
        </div>
        <div className="mt-6 sm:hidden">
          <Link href="/konteynerler" className="btn-outline w-full">
            Tüm Konteynerleri Gör <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <CtaBanner />
      <FAQ />
    </>
  );
}
