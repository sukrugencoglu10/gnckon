"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { typeOptions } from "@/lib/containers";

export function ContainerFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const tip = params.get("tip") ?? "all";
  const durum = params.get("durum") ?? "all";

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value === "all" || !value) next.delete(key);
      else next.set(key, value);
      router.replace(`/konteynerler${next.toString() ? `?${next}` : ""}`, { scroll: false });
    },
    [params, router],
  );

  return (
    <div className="card flex flex-wrap items-end gap-3 p-4">
      <div className="min-w-[180px] flex-1">
        <label className="label" htmlFor="f-tip">Tip</label>
        <select
          id="f-tip"
          className="input"
          value={tip}
          onChange={(e) => update("tip", e.target.value)}
        >
          {typeOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
      <div className="min-w-[160px] flex-1">
        <label className="label" htmlFor="f-durum">Durum</label>
        <select
          id="f-durum"
          className="input"
          value={durum}
          onChange={(e) => update("durum", e.target.value)}
        >
          <option value="all">Tümü</option>
          <option value="yeni">Yeni</option>
          <option value="ikinci-el">2. El</option>
        </select>
      </div>
    </div>
  );
}
