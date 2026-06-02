import { BadgeCheck, Clock, ShieldCheck, Truck } from "lucide-react";

const items = [
  { Icon: ShieldCheck, title: "Garantili Ürün", desc: "Tüm konteynerler kontrol edilmiş, belgeli." },
  { Icon: Truck, title: "Türkiye Geneli", desc: "TIR ile 81 il, kapıya teslim." },
  { Icon: Clock, title: "Hızlı Yanıt", desc: "WhatsApp üzerinden ortalama 5 dk." },
  { Icon: BadgeCheck, title: "Faturalı Satış", desc: "Resmi fatura, kurumsal teslim." },
];

export function TrustStrip() {
  return (
    <section className="border-y border-black/5 bg-white">
      <div className="container-x grid grid-cols-2 gap-px overflow-hidden rounded-none md:grid-cols-4">
        {items.map(({ Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3 bg-white p-5">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-ink-900">{title}</div>
              <div className="text-xs text-ink-500">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
