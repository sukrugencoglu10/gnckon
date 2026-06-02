"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { site } from "@/lib/site-config";
import { LeadForm } from "@/components/LeadForm";

export function Hero() {
  const images = ["/hero-1.jpg", "/hero-2.jpg"];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // 5 saniyede bir değişir
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-ink-900 text-white">
      {/* Arkaplan Resimleri */}
      {images.map((src, idx) => (
        <Image
          key={src}
          src={src}
          alt="Konteyner Arkaplan"
          fill
          priority={idx === 0}
          className={`object-cover transition-opacity duration-1000 ${
            idx === currentImage ? "opacity-40" : "opacity-0"
          }`}
        />
      ))}

      {/* Gradyanlar (Resmin üzerine renk katmak için) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(55% 55% at 85% 5%, rgba(249,115,22,.22), transparent 60%), radial-gradient(45% 45% at 5% 95%, rgba(37,211,102,.12), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink-900 via-ink-900/70 to-transparent"
      />
      <div className="container-x relative py-14 md:py-20 flex flex-col items-center text-center">
        <div className="max-w-3xl">
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            <span className="chip"><ShieldCheck className="h-3.5 w-3.5" /> {site.experienceYears}+ yıl deneyim</span>
            <span className="chip"><Truck className="h-3.5 w-3.5" /> Türkiye geneli teslimat</span>
            <span className="chip">Garantili ürün</span>
          </div>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Satılık <span className="text-brand-400">Yük Konteyneri</span><br />
            anında fiyat, hızlı teslimat
          </h1>
          <p className="mt-6 mx-auto max-w-xl text-base text-slate-100/95 sm:text-lg">
            Yeni ve 2. el 20 ft, 40 ft, Open Top, Reefer (soğutuculu) ve Flat Rack konteynerler.
            WhatsApp'tan saniyeler içinde fiyat alın veya konteynerinizi bize satın.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
            <a
              href={waLink("Merhaba, satılık konteyner fiyat listesi alabilir miyim?")}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-xl bg-wa px-8 py-4 text-lg font-bold text-white shadow-lg shadow-wa/30 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-wa-dark hover:shadow-xl hover:shadow-wa/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wa focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
            >
              <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full bg-white/20">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
                </svg>
              </span>
              WhatsApp ile Fiyat Al
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              <span aria-hidden className="pointer-events-none absolute -left-12 top-0 h-full w-12 -skew-x-12 bg-white/25 opacity-0 transition-all duration-700 group-hover:left-[110%] group-hover:opacity-100" />
            </a>

            <Link
              href="/konteynerimi-sat"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/20 bg-white/10 px-6 py-4 text-lg font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/15"
            >
              Konteynerimi Sat
              <ArrowRight className="h-5 w-5 opacity-70" />
            </Link>

          </div>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-2 text-sm text-slate-200">
            <span className="font-medium text-slate-300">Hızlı filtre:</span>
            <Link href="/konteynerler?tip=20ft" className="rounded-full bg-white/10 px-4 py-1.5 hover:bg-white/15">20 ft</Link>
            <Link href="/konteynerler?tip=40ft" className="rounded-full bg-white/10 px-4 py-1.5 hover:bg-white/15">40 ft</Link>
            <Link href="/konteynerler?tip=40ft-open-top" className="rounded-full bg-white/10 px-4 py-1.5 hover:bg-white/15">Open Top</Link>
            <Link href="/konteynerler?tip=20ft-reefer" className="rounded-full bg-white/10 px-4 py-1.5 hover:bg-white/15">Soğutuculu</Link>
            <Link href="/konteynerler?tip=flat-rack" className="rounded-full bg-white/10 px-4 py-1.5 hover:bg-white/15">Flat Rack</Link>
          </div>
        </div>

        <div className="relative mt-16 mx-auto w-full max-w-4xl shadow-2xl ring-1 ring-black/5 rounded-2xl bg-white text-left">
          <LeadForm variant="buyer" />
        </div>
      </div>
    </section>
  );
}
