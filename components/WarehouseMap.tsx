import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

const WarehouseMapClient = dynamic(() => import("./WarehouseMapClient"), {
  ssr: false,
  loading: () => (
    <div className="container-x py-10">
      <div className="text-center mb-10">
        <div className="h-9 w-64 bg-slate-200 animate-pulse rounded-lg mx-auto"></div>
        <div className="h-5 w-96 bg-slate-100 animate-pulse rounded-lg mx-auto mt-4"></div>
      </div>
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-xl ring-1 ring-black/5 h-[400px] flex items-center justify-center">
          <div className="flex flex-col items-center text-slate-400">
            <MapPin className="w-8 h-8 animate-bounce mb-2" />
            <span className="text-sm font-medium">Hesaplayıcı Yükleniyor...</span>
          </div>
        </div>
        <div className="lg:col-span-2 bg-slate-100 rounded-2xl h-[500px] lg:h-[600px] flex items-center justify-center">
          <div className="flex flex-col items-center text-slate-400">
            <div className="w-10 h-10 border-4 border-slate-300 border-t-brand-500 rounded-full animate-spin mb-3"></div>
            <span className="text-sm font-medium">Harita Yükleniyor...</span>
          </div>
        </div>
      </div>
    </div>
  ),
});

export function WarehouseMap() {
  return (
    <section className="bg-slate-50/50 border-t border-b border-slate-100">
      <WarehouseMapClient />
    </section>
  );
}
