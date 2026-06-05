import { Boxes, Search, Droplets, Wrench } from "lucide-react";

const items = [
  {
    Icon: Boxes,
    title: "Tüm İhtiyaçlara Uygun Stok",
    desc: "20ft'ten 40ft High Cube'a kadar her ebatta ürün anında teslime hazır.",
  },
  {
    Icon: Search,
    title: "Yerinde İnceleme İmkanı",
    desc: "Satın alacağınız konteyneri bizzat depolarımızda görerek, seçerek alma rahatlığı.",
  },
  {
    Icon: Droplets,
    title: "Su ve Hava Geçirmez (WWT)",
    desc: "Wind & Watertight sertifikalı; yükleriniz neme, yağmura ve toza karşı %100 güvende.",
  },
  {
    Icon: Wrench,
    title: "Siparişe Özel Çözümler",
    desc: "Reefer, Flat Rack veya özel kapı/pencere modifikasyonlarıyla tam aradığınız yapı.",
  },
];

export function ValueProps() {
  return (
    <section className="container-x py-14 md:py-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-ink-900 tracking-tight sm:text-4xl">
          KONTEYNER ÇÖZÜMLERİ
        </h2>
        <p className="mt-4 text-ink-500 text-lg max-w-2xl mx-auto">
          İhtiyacınıza uygun tüm konteyner alım ve satım süreçlerinde yanınızdayız.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ Icon, title, desc }) => (
          <div key={title} className="card p-6">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-ink-900">{title}</h3>
            <p className="mt-1 text-sm text-ink-500">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
