"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { typeOptions } from "@/lib/containers";

type Variant = "buyer" | "seller";

export function LeadForm({ variant = "buyer", defaultType }: { variant?: Variant; defaultType?: string }) {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const isSeller = variant === "seller";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries()) as Record<string, string>;
    if (payload.phone) payload.phone = `+90${payload.phone}`;
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variant, ...payload }),
      });
      if (!res.ok) throw new Error("network");
      setOk(true);
      e.currentTarget.reset();
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
          En kısa sürede size dönüş yapacağız. Acil iseniz WhatsApp'tan da ulaşabilirsiniz.
        </p>
        <a href={waLink(waMsg)} target="_blank" rel="noopener noreferrer" className="btn-wa mt-2">
          WhatsApp ile devam et
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card grid gap-4 p-5 md:p-6">
      <div>
        <label className="label" htmlFor="name">Ad Soyad</label>
        <input id="name" name="name" required autoComplete="name" className="input" placeholder="Adınız Soyadınız" />
      </div>

      <div>
        <label className="label" htmlFor="email">E-posta</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          pattern="^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
          title="Lütfen geçerli bir e-posta adresi girin (örn. ad@firma.com)"
          className="input"
          placeholder="ornek@email.com"
        />
      </div>

      <div>
        <label className="label" htmlFor="phone">Telefon</label>
        <div className="flex">
          <span className="inline-flex select-none items-center rounded-l-xl border border-r-0 border-ink-700/15 bg-ink-700/5 px-3.5 text-sm font-semibold text-ink-700">
            +90
          </span>
          <input
            id="phone"
            name="phone"
            required
            autoComplete="tel-national"
            inputMode="numeric"
            pattern="\d{10}"
            minLength={10}
            maxLength={10}
            title="Lütfen +90'dan sonra 10 haneli numaranızı girin (örn. 5XX XXX XX XX)"
            className="input !rounded-l-none"
            placeholder="5XX XXX XX XX"
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "").slice(0, 10);
            }}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="type">Konteyner Tipi</label>
          <select id="type" name="type" defaultValue={defaultType ?? "all"} className="input">
            {typeOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="city">Şehir</label>
          <input id="city" name="city" autoComplete="address-level2" className="input" placeholder="İstanbul" />
        </div>
      </div>

      {isSeller ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="condition">Durum</label>
            <select id="condition" name="condition" className="input">
              <option value="ikinci-el">2. El</option>
              <option value="yeni">Yeni / Az Kullanılmış</option>
            </select>
          </div>
          <div>
            <label className="label" htmlFor="quantity">Adet</label>
            <input id="quantity" name="quantity" type="number" min={1} defaultValue={1} className="input" />
          </div>
        </div>
      ) : (
        <div>
          <label className="label" htmlFor="quantity">Adet</label>
          <input id="quantity" name="quantity" type="number" min={1} defaultValue={1} className="input" />
        </div>
      )}

      <div>
        <label className="label" htmlFor="message">Mesajınız</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="input"
          placeholder={isSeller ? "Konteynerinizin özellikleri, yaşı, bulunduğu şehir..." : "İhtiyacınızı kısaca anlatın..."}
        />
      </div>

      <label className="flex items-start gap-2 text-xs text-ink-500">
        <input type="checkbox" required className="mt-0.5" />
        <span>
          Kişisel verilerimin bu talep kapsamında işlenmesini kabul ediyorum.
        </span>
      </label>

      {err && <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{err}</div>}

      <button type="submit" disabled={loading} className="btn-primary text-base !py-3.5">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Gönder
      </button>
      <p className="text-center text-xs text-ink-400">
        Veya doğrudan{" "}
        <a className="font-semibold text-wa hover:underline" href={waLink()} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        {" "}üzerinden yazın.
      </p>
    </form>
  );
}
