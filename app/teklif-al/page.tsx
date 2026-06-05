import { LeadForm } from "@/components/LeadForm";
import { CtaBanner } from "@/components/CtaBanner";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Konteyner Teklif Al — Anında Fiyat",
  description:
    "İhtiyacınızı yazın, en kısa sürede teklif gönderelim. WhatsApp veya formla anında konteyner fiyatı alın.",
  path: "/teklif-al",
});

export default function TeklifAlPage() {
  return (
    <>
      <section className="border-b border-black/5 bg-slate-50">
        <div className="container-x py-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">Teklif Al</h1>
          <p className="mt-2 max-w-xl text-ink-600">
            İhtiyaç duyduğunuz konteyneri seçin, telefon ve şehir bilgisini bırakın — biz size geri dönelim.
          </p>
        </div>
      </section>

      <section className="container-x py-10">
        <div className="grid gap-8 lg:grid-cols-1">
          <aside className="w-full">
            <div className="card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-brand-50/50">
              <div>
                <h2 className="text-lg font-bold text-ink-900">Neden bizimle çalışmalısınız?</h2>
                <p className="mt-1 text-sm text-ink-600">Sektördeki tecrübemizle en iyi hizmeti sunuyoruz.</p>
              </div>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-700 font-medium">
                <li className="flex items-center gap-2">✓ Geniş stok</li>
                <li className="flex items-center gap-2">✓ Türkiye geneli teslimat</li>
                <li className="flex items-center gap-2">✓ Faturalı & garantili</li>
                <li className="flex items-center gap-2">✓ 5 dk'da yanıt</li>
              </ul>
            </div>
          </aside>
          
          <div className="w-full max-w-4xl mx-auto mt-4 shadow-2xl ring-1 ring-black/5 rounded-2xl">
            <LeadForm variant="buyer" />
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
