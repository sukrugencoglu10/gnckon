"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { typeOptions } from "@/lib/containers";
import { Filter, X, Loader2 } from "lucide-react";

export function ContainerFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const tip = params.get("tip") ?? "all";
  const durum = params.get("durum") ?? "all";

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value === "all" || !value) next.delete(key);
      else next.set(key, value);
      
      startTransition(() => {
        router.replace(`/konteynerler${next.toString() ? `?${next}` : ""}`, { scroll: false });
      });
    },
    [params, router],
  );

  const FiltersContent = () => (
    <>
      <div className="flex-1 min-w-[180px]">
        <label className="label" htmlFor="f-tip">Konteyner Tipi</label>
        <select
          id="f-tip"
          className="input disabled:opacity-60"
          value={tip}
          onChange={(e) => update("tip", e.target.value)}
          disabled={isPending}
        >
          {typeOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
      <div className="flex-1 min-w-[160px]">
        <label className="label" htmlFor="f-durum">Kondisyon</label>
        <select
          id="f-durum"
          className="input disabled:opacity-60"
          value={durum}
          onChange={(e) => update("durum", e.target.value)}
          disabled={isPending}
        >
          <option value="all">Tümü</option>
          <option value="yeni">Sıfır / Yeni</option>
          <option value="ikinci-el">2. El</option>
        </select>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden flex items-center justify-between card p-4 mb-4 bg-white ring-1 ring-black/5 shadow-sm">
        <button
          onClick={() => setIsOpen(true)}
          className="btn-outline flex-1 mr-3 border-ink-200"
        >
          <Filter className="h-4 w-4" /> Filtrele
        </button>
        {isPending && <Loader2 className="h-5 w-5 animate-spin text-brand-600" />}
      </div>

      {/* Desktop Container */}
      <div className="hidden md:flex card flex-wrap items-end gap-3 p-4 relative ring-1 ring-black/5 shadow-sm bg-white">
        <FiltersContent />
        {isPending && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-2xl z-10 backdrop-blur-[1px]">
            <Loader2 className="h-6 w-6 animate-spin text-brand-600" />
            <span className="ml-2 text-sm font-semibold text-brand-700">Sonuçlar Güncelleniyor...</span>
          </div>
        )}
      </div>

      {/* Mobile Modal (Bottom Sheet) */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Bottom Sheet Panel */}
          <div className="relative w-full bg-white rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-full duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-ink-900">Filtrele</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-ink-100 text-ink-600 hover:bg-ink-200 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex flex-col gap-5">
              <FiltersContent />
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full mt-8 !py-3 text-base"
              disabled={isPending}
            >
              {isPending ? (
                <><Loader2 className="h-5 w-5 animate-spin mr-1" /> Yükleniyor...</>
              ) : (
                "Sonuçları Göster"
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
