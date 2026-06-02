# Satılık Yük Konteyneri — Vitrin Sitesi

Next.js 14 (App Router) + TypeScript + Tailwind CSS ile yapılmış, **yüksek dönüşüm** odaklı, SEO ve mobil uyumlu konteyner alım-satım vitrin sitesi.

## Hızlı Başlangıç

```bash
npm install
npm run dev
# http://localhost:3000
```

Üretim:
```bash
npm run build
npm run start
```

## Kişiselleştirme — 3 Adım

1. **İletişim bilgileri**: [`lib/site-config.ts`](lib/site-config.ts) — placeholder değerleri (firma adı, telefon, WhatsApp, e-posta, adres, URL) değiştirin.
2. **Konteynerler**: [`lib/containers.ts`](lib/containers.ts) — kendi stoğunuzdaki konteynerleri ekleyin/silin. Görselleri `public/images/containers/` altına koyun (örnek SVG'ler mevcut).
3. **Form alıcısı**: [`app/api/lead/route.ts`](app/api/lead/route.ts) — formlar şu an `console.log`'a düşüyor. Resend / SMTP / başka bir endpoint ekleyin (TODO yorumu mevcut).

## Özellikler

- **CTA stratejisi**: sticky header (telefon + WhatsApp + Teklif Al), mobil alt çubuk (Ara / WhatsApp / Teklif), floating WhatsApp butonu, hero üzerinde primer/sekonder eylemler, her ürün kartında çift CTA
- **SEO**: `lang="tr"`, sayfa başına `generateMetadata`, `sitemap.ts`, `robots.ts`, JSON-LD (LocalBusiness, Product, FAQPage, BreadcrumbList)
- **Performans**: SSG, `next/image` AVIF/WebP, `next/font` swap, minimal client JS
- **Mobil-öncelikli UI**: 360px'den itibaren responsive, dokunmatik hedefler ≥ 44px, alt CTA çubuğu safe-area uyumlu

## Yapı

- `app/` — Next.js App Router rotaları
- `components/` — Header, Footer, Hero, ContainerCard, LeadForm, vs.
- `lib/` — `site-config.ts` (tek yer iletişim), `containers.ts` (veri), `seo.ts`, `whatsapp.ts`
- `public/images/containers/` — örnek SVG ürün görselleri

## Deploy

Vercel'de tek tıkla:
```bash
npm i -g vercel
vercel
```
Veya GitHub repoyu Vercel'e bağlayın.
