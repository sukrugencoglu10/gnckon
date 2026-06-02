import { BadgeCheck, Clock, ShieldCheck, Truck } from "lucide-react";

const items = [
  { Icon: ShieldCheck, title: "Garantili Ürün", desc: "Tüm konteynerler kontrol edilmiş, belgeli." },
  { Icon: Truck, title: "Türkiye Geneli", desc: "TIR ile 81 il, kapıya teslim." },
  { Icon: Clock, title: "Hızlı Yanıt", desc: "WhatsApp üzerinden ortalama 5 dk." },
  { Icon: BadgeCheck, title: "Faturalı Satış", desc: "Resmi fatura, kurumsal teslim." },
];

export function TrustStrip() {
  return (
    <section className="border-b border-black/5 bg-white">
      <div className="container-x py-8 md:py-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          {items.map(({ Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-500/20 transition-transform hover:scale-110">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-ink-900 leading-tight">{title}</h3>
                <p className="mt-1 text-sm text-ink-500 leading-snug">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
