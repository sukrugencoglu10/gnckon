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
      <section className="border-b border-black/5 bg-ink-900 text-white">
        <div className="container-x py-10">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Teklif Al</h1>
          <p className="mt-2 max-w-xl text-ink-400">
            İhtiyaç duyduğunuz konteyneri seçin, telefon ve şehir bilgisini bırakın — biz size geri dönelim.
          </p>
        </div>
      </section>

      <section className="container-x py-10">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <LeadForm variant="buyer" />
          </div>
          <aside className="lg:col-span-2">
            <div className="card p-6">
              <h2 className="text-lg font-bold text-ink-900">Neden bizimle?</h2>
              <ul className="mt-3 space-y-2 text-sm text-ink-600">
                <li>• Geniş stok — yeni ve 2. el seçenek</li>
                <li>• Türkiye geneli TIR ile teslimat</li>
                <li>• Faturalı, garantili, sertifikalı</li>
                <li>• Ortalama 5 dakikadan kısa yanıt</li>
                <li>• Kurumsal müşterilere vadeli ödeme</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
