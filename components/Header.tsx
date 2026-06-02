"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { nav, site } from "@/lib/site-config";
import { telLink, waLink } from "@/lib/whatsapp";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="container-x flex h-16 items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2" aria-label={site.name}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white font-black">
            K
          </span>
          <span className="font-extrabold tracking-tight text-ink-900">
            {site.name}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-700/5"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a href={telLink()} className="btn-ghost" aria-label="Telefonla ara">
            <Phone className="h-4 w-4" />
            <span className="hidden xl:inline">{site.phone}</span>
            <span className="xl:hidden">Ara</span>
          </a>
          <a
            href={waLink("Merhaba, konteyner alımı için bilgi almak istiyorum.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa"
          >
            WhatsApp
          </a>
          <Link href="/teklif-al" className="btn-primary">
            Teklif Al
          </Link>
        </div>

        <button
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink-700/15"
          aria-label="Menüyü aç"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-black/5 bg-white">
          <div className="container-x py-3 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-ink-800 hover:bg-ink-700/5"
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a href={telLink()} className="btn-outline">
                <Phone className="h-4 w-4" /> Ara
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
