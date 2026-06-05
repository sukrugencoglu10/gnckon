import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { telLink } from "@/lib/whatsapp";
import { site } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "İletişim",
  description: `${site.name} iletişim — telefon, WhatsApp, e-posta ve adres bilgileri.`,
  path: "/iletisim",
});

export default function IletisimPage() {
  return (
    <>
      <section className="border-b border-black/5 bg-slate-50">
        <div className="container-x py-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">İletişim</h1>
          <p className="mt-2 text-ink-600">Bize ulaşmanın en hızlı yolları.</p>
        </div>
      </section>

      <section className="container-x py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <a href={telLink()} className="card flex flex-col gap-2 p-5 hover:shadow-lg">
            <Phone className="h-6 w-6 text-brand-600" />
            <div className="text-xs uppercase text-ink-500">Telefon</div>
            <div className="font-bold text-ink-900">{site.phone}</div>
          </a>
          <a href={`mailto:${site.email}`} className="card flex flex-col gap-2 p-5 hover:shadow-lg">
            <Mail className="h-6 w-6 text-brand-600" />
            <div className="text-xs uppercase text-ink-500">E-posta</div>
            <div className="font-bold text-ink-900">{site.email}</div>
          </a>
          <div className="card flex flex-col gap-2 p-5">
            <Clock className="h-6 w-6 text-brand-600" />
            <div className="text-xs uppercase text-ink-500">Çalışma Saatleri</div>
            <div className="font-bold text-ink-900">{site.hours}</div>
          </div>
        </div>

        <div className="mt-8 card p-6">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 text-brand-600" />
            <div>
              <div className="text-xs uppercase text-ink-500">Adres</div>
              <div className="text-base font-semibold text-ink-900">{site.address}</div>
              <div className="text-sm text-ink-500">{site.city} / {site.region}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
