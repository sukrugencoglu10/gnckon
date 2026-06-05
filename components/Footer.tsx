import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { nav, site } from "@/lib/site-config";
import { telLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-black/5 bg-slate-50 text-ink-600">
      <div className="container-x grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-ink-900">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 font-black">
              K
            </span>
            <span className="font-extrabold tracking-tight">{site.name}</span>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-900">
            Bağlantılar
          </h3>
          <ul className="space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-ink-900 transition-colors">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-900">
            İletişim
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-brand-400" />
              <span>{site.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-400" />
              <a href={telLink()} className="hover:text-ink-900 transition-colors">
                {site.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-400" />
              <a href={`mailto:${site.email}`} className="hover:text-ink-900 transition-colors">
                {site.email}
              </a>
            </li>
            <li className="text-xs text-ink-500">{site.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-black/5">
        <div className="container-x flex flex-col gap-2 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.legalName}. Tüm hakları saklıdır.
          </span>
          <span>{site.region}</span>
        </div>
      </div>
    </footer>
  );
}
