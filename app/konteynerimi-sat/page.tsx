import { LeadForm } from "@/components/LeadForm";
import { CtaBanner } from "@/components/CtaBanner";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Konteynerimi Sat — Hızlı Teklif",
  description:
    "Elinizdeki konteyneri biz satın alalım veya komisyonla satışına aracılık edelim. 24 saat içinde teklif alın.",
  path: "/konteynerimi-sat",
});

export default function KonteynerimiSatPage() {
  return (
    <>
      <section className="border-b border-black/5 bg-ink-900 text-white">
        <div className="container-x py-10">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Konteynerimi Sat</h1>
          <p className="mt-2 max-w-xl text-ink-400">
            Konteynerinizin bilgilerini paylaşın — 24 saat içinde size en iyi teklifi gönderelim.
          </p>
        </div>
      </section>

      <section className="container-x py-10">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <LeadForm variant="seller" />
          </div>
          <aside className="lg:col-span-2">
            <div className="card p-6">
              <h2 className="text-lg font-bold text-ink-900">Süreç nasıl işliyor?</h2>
              <ol className="mt-3 space-y-3 text-sm text-ink-700">
                <li><b>1.</b> Formu doldurun veya WhatsApp'tan fotoğraf gönderin.</li>
                <li><b>2.</b> 24 saat içinde fiyat teklifimizi iletelim.</li>
                <li><b>3.</b> Anlaşma sağlanırsa konteyneri biz teslim alalım.</li>
                <li><b>4.</b> Ödeme havale ile aynı gün yapılır.</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
