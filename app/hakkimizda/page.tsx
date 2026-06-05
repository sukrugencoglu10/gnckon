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
              <b>{site.legalName}</b>, Türkiye genelinde global standartlara uygun konteyner tedariki, alım-satımı ve mühendislik odaklı modifikasyon süreçlerinde sektörün öncü ve güvenilir markalarından biridir. Kuruluşumuzdan bu yana, küresel ticaretin ve lojistik ekosisteminin en kritik yapı taşı olan konteyner ihtiyaçlarına; yenilikçi, hızlı ve sürdürülebilir çözümler üretiyoruz.
            </p>
            <p>
              Geniş tedarik ağımız ve güçlü stok altyapımız sayesinde; liman çıkışlı sıfır (one-way) konteynerlerden, uluslararası taşımacılık standartlarına uygun (CSC sertifikalı) bakımlı ikinci el ürünlere; hassas iklimlendirme gerektiren soğutuculu (reefer) ünitelerden, ağır ve gabari dışı lojistik operasyonlarının vazgeçilmezi olan flat rack ve open top çözümlerine kadar çok geniş bir ürün yelpazesiyle hizmet sunuyoruz.
            </p>
            
            <p>
              Sektördeki varlığımızı ve müşteri sadakatimizi üç temel ilke üzerine inşa ettik: <b>Şeffaflık</b>, <b>Operasyonel Hız</b> ve <b>Koşulsuz Güven</b>.
            </p>
            <p>
              GNCKON çatısı altında gerçekleştirdiğimiz tüm ticari süreçler tam şeffaflık ilkesiyle yürütülür; tüm ürünlerimiz kalite kontrol testlerinden geçirilerek, sertifikalı ve resmi faturalı olarak teslim edilir. Amacımız, müşterilerimizin tedarik süreçlerindeki riskleri sıfıra indirerek operasyonel verimliliklerine katkıda bulunmaktır.
            </p>
            <p>
              <b>Uluslararası Standartlar, Sertifikalı Güvence:</b> Ticari operasyonlarınızın aksamaması için tedarik ettiğimiz her konteyner, uluslararası taşımacılık kurallarına ve sızdırmazlık standartlarına tam uyum garantisi taşır. Sektördeki tecrübemiz ve güçlü finansal yapımızla, projelerinizin en güvenilir halkası olmak için çalışıyoruz.
            </p>
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
