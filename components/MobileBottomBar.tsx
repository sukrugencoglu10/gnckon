import Link from "next/link";
import { MessageCircle, Phone, Send } from "lucide-react";
import { telLink, waLink } from "@/lib/whatsapp";

export function MobileBottomBar() {
  return (
    <nav
      aria-label="Hızlı iletişim"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-black/10 bg-white shadow-[0_-6px_20px_rgba(0,0,0,0.06)] md:hidden"
      style={{ paddingBottom: "var(--safe-bottom)" }}
    >
      <a
        href={telLink()}
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-semibold text-ink-800 active:bg-ink-700/5"
      >
        <Phone className="h-5 w-5" />
        Ara
      </a>
      <a
        href={waLink("Merhaba, konteyner almak istiyorum.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-0.5 bg-wa py-2.5 text-xs font-bold text-white"
      >
        <MessageCircle className="h-5 w-5" />
        WhatsApp
      </a>
      <Link
        href="/teklif-al"
        className="flex flex-col items-center justify-center gap-0.5 bg-brand-600 py-2.5 text-xs font-bold text-white"
      >
        <Send className="h-5 w-5" />
        Teklif Al
      </Link>
    </nav>
  );
}
