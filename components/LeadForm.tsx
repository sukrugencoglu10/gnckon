"use client";

import { useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { categoryOptions, regionOptions, sizeOptions } from "@/lib/containers";

type Variant = "buyer" | "seller";

const STEPS = [
  { id: 1, label: "Konteyner Bilgileri" },
  { id: 2, label: "İletişim Bilgileri" },
];

export function LeadForm({ variant = "buyer", defaultType }: { variant?: Variant; defaultType?: string }) {
  const [step, setStep] = useState(1);
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

  function canGoNext(): boolean {
    return !!form.category && !!form.quantity && !!form.region;
  }

  function goNext() {
    if (!canGoNext()) return;
    setStep(2);
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
    <form onSubmit={onSubmit} className="card overflow-hidden">
      {/* step indicator */}
      <div className="border-b border-black/5 bg-ink-700/[.03] px-5 py-5 md:px-6">
        <h2 className="mb-6 text-center text-lg font-extrabold text-ink-900">Hızlı Teklif Al</h2>
        <div className="relative flex items-start justify-between">
          <div className="absolute left-[25%] right-[25%] top-4 h-[2px] bg-ink-700/10" />
          <div
            className="absolute left-[25%] top-4 h-[2px] bg-brand-500 transition-all duration-500"
            style={{ width: step === 1 ? "0%" : "50%" }}
          />
          {STEPS.map((s) => (
            <div key={s.id} className="relative z-10 flex w-1/2 flex-col items-center">
              <div
                className={`grid h-8 w-8 place-items-center rounded-full text-sm font-bold transition-all ${
                  step >= s.id
                    ? "bg-brand-600 text-white shadow-lg shadow-brand-500/30"
                    : "bg-ink-700/10 text-ink-400"
                }`}
              >
                {step > s.id ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s.id
                )}
              </div>
              <span
                className={`mt-2 text-center text-[10px] font-medium leading-tight sm:text-xs ${
                  step >= s.id ? "text-brand-700" : "text-ink-400"
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 md:p-6">
        {/* ─── STEP 1: Konteyner Bilgileri ─── */}
        {step === 1 && (
          <div className="grid gap-4 animate-fadeIn">
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
              <label className="label" htmlFor="size">Konteyner Boyutu</label>
              <select
                id="size"
                className="input"
                value={form.size}
                onChange={(e) => update("size", e.target.value)}
              >
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
              <input
                id="quantity"
                type="number"
                min={1}
                max={1000}
                required
                className="input"
                value={form.quantity}
                onChange={(e) => update("quantity", e.target.value)}
              />
            </div>

            <div>
              <label className="label" htmlFor="region">Konteynerin Alınacağı Bölge *</label>
              <select
                id="region"
                className="input"
                required
                value={form.region}
                onChange={(e) => update("region", e.target.value)}
              >
                <option value="">Seçiniz</option>
                {regionOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {isSeller && (
              <div>
                <label className="label" htmlFor="condition">Durum</label>
                <select
                  id="condition"
                  className="input"
                  value={form.condition}
                  onChange={(e) => update("condition", e.target.value)}
                >
                  <option value="ikinci-el">2. El</option>
                  <option value="yeni">Yeni / Az Kullanılmış</option>
                </select>
              </div>
            )}
          </div>
        )}

        {/* ─── STEP 2: İletişim Bilgileri ─── */}
        {step === 2 && (
          <div className="grid gap-4 animate-fadeIn">
            <div>
              <label className="label" htmlFor="name">Ad Soyad *</label>
              <input
                id="name"
                className="input"
                required
                placeholder="Adınız Soyadınız"
                autoComplete="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>

            <div>
              <label className="label" htmlFor="company">Firma Adı</label>
              <input
                id="company"
                className="input"
                placeholder="(Opsiyonel)"
                autoComplete="organization"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
              />
            </div>

            <div>
              <label className="label" htmlFor="email">E-posta</label>
              <input
                id="email"
                type="email"
                className="input"
                placeholder="ornek@email.com"
                autoComplete="email"
                inputMode="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>

            <div>
              <label className="label" htmlFor="phone">Telefon *</label>
              <div className="flex">
                <span className="inline-flex select-none items-center rounded-l-xl border border-r-0 border-ink-700/15 bg-ink-700/5 px-3.5 text-sm font-semibold text-ink-700">
                  +90
                </span>
                <input
                  id="phone"
                  className="input !rounded-l-none"
                  required
                  placeholder="5XX XXX XX XX"
                  autoComplete="tel-national"
                  inputMode="numeric"
                  pattern="\d{10}"
                  minLength={10}
                  maxLength={10}
                  title="Lütfen 10 haneli numaranızı girin (örn. 5XX XXX XX XX)"
                  value={form.phone}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                    update("phone", digits);
                  }}
                />
              </div>
            </div>

            <div>
              <label className="label" htmlFor="message">Mesajınız</label>
              <textarea
                id="message"
                rows={3}
                className="input"
                placeholder={isSeller ? "Konteynerinizin özellikleri, yaşı, bulunduğu şehir..." : "Ek notlarınız varsa buraya yazabilirsiniz..."}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
              />
            </div>

            <label className="flex items-start gap-2 text-xs text-ink-500">
              <input type="checkbox" required className="mt-0.5" />
              <span>Kişisel verilerimin bu talep kapsamında işlenmesini kabul ediyorum.</span>
            </label>

            {err && <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{err}</div>}
          </div>
        )}

        {/* ─── Navigation ─── */}
        <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4">
          {step > 1 ? (
            <button type="button" onClick={() => setStep(1)} className="btn-ghost text-sm">
              <ChevronLeft className="h-4 w-4" />
              Geri
            </button>
          ) : (
            <span />
          )}

          {step === 1 ? (
            <button
              type="button"
              onClick={goNext}
              disabled={!canGoNext()}
              className="btn-primary ml-auto text-sm !py-3 !px-6"
            >
              İleri
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading || !canSubmit()}
              className="btn-primary ml-auto text-sm !py-3 !px-6"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Gönder
            </button>
          )}
        </div>

        <p className="mt-3 text-center text-xs text-ink-400">
          Veya doğrudan{" "}
          <a className="font-semibold text-wa hover:underline" href={waLink()} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          {" "}üzerinden yazın.
        </p>
      </div>
    </form>
  );
}
