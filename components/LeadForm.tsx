"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { categoryOptions, regionOptions, sizeOptions } from "@/lib/containers";

type Variant = "buyer" | "seller";

export function LeadForm({ variant = "buyer", defaultType }: { variant?: Variant; defaultType?: string }) {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const isSeller = variant === "seller";

  const [form, setForm] = useState({
    category: "",
    size: defaultType ?? "",
    quantity: "1",
    region: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    condition: "ikinci-el",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function canSubmit(): boolean {
    return !!form.name && !!form.phone && form.phone.replace(/\D/g, "").length === 10;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit()) return;
    setLoading(true);
    setErr(null);
    const payload: Record<string, string> = {
      variant,
      category: form.category,
      size: form.size,
      quantity: form.quantity,
      region: form.region,
      name: form.name,
      email: form.email,
      phone: `+90${form.phone}`,
      company: form.company,
      message: form.message,
    };
    if (isSeller) payload.condition = form.condition;

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("network");
      setOk(true);
    } catch {
      setErr("Form gönderilemedi. Lütfen WhatsApp üzerinden iletişime geçin.");
    } finally {
      setLoading(false);
    }
  }

  if (ok) {
    const waMsg = isSeller
      ? "Merhaba, konteynerimi satmak için form gönderdim, detayları paylaşmak istiyorum."
      : "Merhaba, teklif formu doldurdum, fiyat almak istiyorum.";
    return (
      <div className="card flex flex-col items-center gap-3 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-wa" />
        <h3 className="text-lg font-bold text-ink-900">Talebiniz alındı</h3>
        <p className="text-sm text-ink-600">
          En kısa sürede size dönüş yapacağız. Acil iseniz WhatsApp&apos;tan da ulaşabilirsiniz.
        </p>
        <a href={waLink(waMsg)} target="_blank" rel="noopener noreferrer" className="btn-wa mt-2">
          WhatsApp ile devam et
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card bg-white p-6 md:p-8 text-left">
      <div className="mb-6 flex flex-col justify-between gap-2 border-b border-black/5 pb-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-extrabold text-ink-900">Hızlı Teklif Al</h2>
          <p className="text-sm text-ink-500 mt-1">İhtiyacınızı belirtin, ortalama 5 dakikada dönelim.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:gap-8 md:divide-x md:divide-black/5">
        {/* 1. Konteyner Bilgileri */}
        <div className="pt-2">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-ink-900">Konteyner Bilgileri</h3>
          </div>
          <div className="grid gap-4">
            <div>
              <label className="label" htmlFor="category">Konteyner Tipi *</label>
              <select
                id="category"
                className="input"
                required
                value={form.category}
                onChange={(e) => {
                  const val = e.target.value;
                  setForm(prev => ({
                    ...prev,
                    category: val,
                    size: (val !== "standard_cargo" && prev.size === "40ft-hc") ? "" : prev.size
                  }));
                }}
              >
                <option value="">Seçiniz</option>
                {categoryOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="size">Boyut</label>
              <select id="size" className="input" value={form.size} onChange={(e) => update("size", e.target.value)}>
                <option value="">Seçiniz</option>
                {sizeOptions
                  .filter((o) => form.category === "standard_cargo" || !form.category ? true : o.value !== "40ft-hc")
                  .map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="quantity">Miktar *</label>
              <input id="quantity" type="number" min={1} max={1000} required className="input" value={form.quantity} onChange={(e) => update("quantity", e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="region">Alınacak Bölge *</label>
              <select id="region" className="input" required value={form.region} onChange={(e) => update("region", e.target.value)}>
                <option value="">Seçiniz</option>
                {regionOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            {isSeller && (
              <div>
                <label className="label" htmlFor="condition">Durum</label>
                <select id="condition" className="input" value={form.condition} onChange={(e) => update("condition", e.target.value)}>
                  <option value="ikinci-el">2. El</option>
                  <option value="yeni">Yeni / Az Kullanılmış</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* 2. İletişim Bilgileri */}
        <div className="pt-6 border-t border-black/5 md:border-t-0 md:pt-2 md:pl-8">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-ink-900">İletişim Bilgileri</h3>
          </div>
          <div className="grid gap-4">
            <div>
              <label className="label" htmlFor="name">Ad Soyad *</label>
              <input id="name" className="input" required placeholder="Adınız Soyadınız" autoComplete="name" value={form.name} onChange={(e) => update("name", e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="company">Firma Adı <span className="text-xs text-ink-400 font-normal">(Opsiyonel)</span></label>
              <input id="company" className="input" placeholder="Şirketiniz" autoComplete="organization" value={form.company} onChange={(e) => update("company", e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="email">E-posta</label>
              <input id="email" type="email" className="input" placeholder="ornek@email.com" autoComplete="email" inputMode="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="phone">Telefon *</label>
              <div className="flex">
                <span className="inline-flex select-none items-center rounded-l-xl border border-r-0 border-ink-700/15 bg-ink-700/5 px-3.5 text-sm font-semibold text-ink-700">+90</span>
                <input id="phone" className="input !rounded-l-none" required placeholder="5XX XXX XX XX" autoComplete="tel-national" inputMode="numeric" pattern="\d{10}" minLength={10} maxLength={10} title="Lütfen 10 haneli numaranızı girin (örn. 5XX XXX XX XX)" value={form.phone} onChange={(e) => { const digits = e.target.value.replace(/\D/g, "").slice(0, 10); update("phone", digits); }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Ek Bilgiler */}
      <div className="mt-6 border-t border-black/5 pt-6">
        <div className="mb-4">
          <h3 className="text-sm font-bold text-ink-900">Ek Bilgiler</h3>
        </div>
        <div className="grid gap-4">
          <div>
            <label className="label" htmlFor="message">Mesajınız</label>
            <textarea id="message" rows={3} className="input" placeholder={isSeller ? "Konteynerinizin özellikleri, yaşı..." : "Ek notlarınız varsa..."} value={form.message} onChange={(e) => update("message", e.target.value)} />
          </div>
          <label className="flex items-start gap-2 text-xs text-ink-500">
            <input type="checkbox" required className="mt-0.5" />
            <span>Kişisel verilerimin bu talep kapsamında işlenmesini kabul ediyorum.</span>
          </label>
          {err && <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{err}</div>}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-black/5 pt-6 sm:flex-row">
        <p className="text-xs text-ink-400 text-center sm:text-left">
          Veya doğrudan <a className="font-semibold text-wa hover:underline" href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a> üzerinden yazın.
        </p>
        <button type="submit" disabled={loading || !canSubmit()} className="btn-primary w-full sm:w-auto sm:px-8">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Gönder
        </button>
      </div>
    </form>
  );
}
