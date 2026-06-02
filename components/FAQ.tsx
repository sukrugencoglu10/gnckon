import { JsonLd } from "./JsonLd";

const faqs = [
  {
    q: "Konteyner siparişi sonrası kaç günde teslim edilir?",
    a: "Stokta olan konteynerler aynı gün sevk edilebilir. Türkiye'nin büyük şehirlerine 2–4 iş günü içinde TIR ile teslim edilir. Modifikasyon gerektiren siparişler 7–14 iş günü içinde hazırlanır.",
  },
  {
    q: "Konteynerleri yerinde görebilir miyim?",
    a: "Evet. İstanbul ve İzmir depolarımızda tüm konteynerler ziyarete açıktır. Randevu için WhatsApp veya telefon ile bize ulaşabilirsiniz.",
  },
  {
    q: "Garanti ve fatura sağlıyor musunuz?",
    a: "Tüm satışlarımız faturalıdır. Yeni konteynerlerde 2 yıl yapısal garanti, 2. el konteynerlerde teslimat öncesi yapısal kontrol belgesi sunulur.",
  },
  {
    q: "Konteynerimi siz satın alıyor musunuz?",
    a: "Evet. Mevcut konteynerinizin fotoğraf ve bilgilerini 'Konteynerimi Sat' formundan ya da WhatsApp üzerinden iletmeniz halinde 24 saat içinde teklifimizi paylaşıyoruz.",
  },
  {
    q: "Ödeme seçenekleri nelerdir?",
    a: "Havale/EFT ve kurumsal kart ile peşin ödeme yapabilirsiniz. Kurumsal müşterilere proje bazlı vadeli seçenekler sunulmaktadır.",
  },
];

export function FAQ() {
  return (
    <section id="sss" className="container-x py-14 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
          Sıkça Sorulan Sorular
        </h2>
        <p className="mt-3 text-ink-500">
          Aradığınızı bulamadıysanız WhatsApp'tan saniyeler içinde sorabilirsiniz.
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-3xl divide-y divide-black/5 rounded-2xl bg-white shadow-card ring-1 ring-black/5">
        {faqs.map((f) => (
          <details key={f.q} className="group p-5 open:bg-brand-50/40">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink-900">
              {f.q}
              <span className="text-brand-600 transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">{f.a}</p>
          </details>
        ))}
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </section>
  );
}
