import { Boxes, HandCoins, Snowflake, Wrench } from "lucide-react";

const items = [
  {
    Icon: Boxes,
    title: "Geniş Stok",
    desc: "20 ft, 40 ft, High Cube, Reefer ve Flat Rack konteynerler her zaman hazır.",
  },
  {
    Icon: HandCoins,
    title: "Alım & Satım",
    desc: "Konteynerinizi satın alıyoruz ya da komisyonla satışına aracılık ediyoruz.",
  },
  {
    Icon: Snowflake,
    title: "Soğutuculu Çözümler",
    desc: "Carrier / Thermo King üniteli reefer konteynerler, kiralık seçenekle.",
  },
  {
    Icon: Wrench,
    title: "Modifikasyon",
    desc: "Açık platform flat rack, open top ve özel ölçü modifikasyon hizmetleri.",
  },
];

export function ValueProps() {
  return (
    <section className="container-x py-14 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
          Tek noktadan konteyner çözümleri
        </h2>
        <p className="mt-3 text-ink-500">
          Alın, satın, kiralayın veya size özel modifiye ettirin — tek firma, hızlı süreç.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
