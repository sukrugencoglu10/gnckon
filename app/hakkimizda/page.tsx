import Image from "next/image";
import { AnimatedStats } from "@/components/AnimatedStats";
import { CtaBanner } from "@/components/CtaBanner";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Hakkımızda",
  description: `${site.experienceYears}+ yıllık deneyimle Türkiye genelinde konteyner alım-satım ve modifikasyon hizmetleri.`,
  path: "/hakkimizda",
});

export default function HakkimizdaPage() {
  return (
    <>
      <section className="border-b border-black/5 bg-ink-900 text-white">
        <div className="container-x py-10">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Hakkımızda</h1>
          <p className="mt-2 max-w-2xl text-ink-400">
            {site.experienceYears}+ yıllık tecrübemizle satılık konteyner pazarında güvenilir adres.
          </p>
        </div>
      </section>

      <section className="container-x py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-6">
            <div className="prose prose-neutral max-w-none">
            <p>
              <b>{site.legalName}</b>, Türkiye'nin önde gelen konteyner alım-satım ve modifikasyon firmasıdır. Liman çıkışı yeni konteynerlerden, bakımlı ikinci el ürünlere; soğutuculu reefer ünitelerinden açık platform flat rack konteynerlere kadar geniş bir stokla hizmet veriyoruz.
            </p>
            <p>
              Misyonumuz, müşterilerimize <b>hızlı yanıt</b>, <b>şeffaf fiyat</b> ve <b>garantili teslimat</b> sağlamaktır. Tüm satışlarımız faturalı, kontrol edilmiş ve sertifikalıdır.
            </p>
            <h2>Hizmet Alanlarımız</h2>
            <ul>
              <li>Yeni ve 2. el konteyner satışı (20 ft, 40 ft, High Cube)</li>
              <li>Soğutuculu (Reefer) konteyner satış ve kiralama</li>
              <li>Flat rack & open top — ağır ve gabari dışı yük taşımacılığı</li>
              <li>Müşterilerin elindeki konteynerlerin alımı</li>
              <li>Türkiye geneli kapıya teslim sevkiyat</li>
            </ul>
          </div>

          <AnimatedStats experienceYears={site.experienceYears} />
        </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl ring-1 ring-black/10 lg:aspect-[3/4] xl:aspect-square">
            <Image 
              src="/hakkimizda.jpeg"
              alt="Hakkımızda - GNCKON Konteyner"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
