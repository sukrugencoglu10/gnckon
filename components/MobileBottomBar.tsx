import Link from "next/link";
import { MessageCircle, Phone, Send } from "lucide-react";
import { telLink, waLink } from "@/lib/whatsapp";

export function MobileBottomBar() {
  return (
    <nav
      aria-label="Hızlı iletişim"
      className="fixed inset-x-0 bottom-0 z-40 grid h-[72px] grid-cols-3 border-t border-black/10 bg-white shadow-[0_-6px_20px_rgba(0,0,0,0.06)] md:hidden"
      style={{ paddingBottom: "var(--safe-bottom)" }}
    >
      <a
        href={telLink()}
        className="flex h-full flex-col items-center justify-center gap-0.5 text-xs font-semibold text-ink-900 transition-transform hover:scale-[1.02] active:scale-[0.98] active:bg-ink-700/5"
      >
        <Phone className="h-5 w-5" />
        Ara
      </a>
      <a
        href={waLink("Merhaba, konteyner almak istiyorum.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full flex-col items-center justify-center gap-0.5 bg-wa text-xs font-bold text-white transition-colors hover:bg-wa-dark active:bg-wa-dark"
      >
        <MessageCircle className="h-5 w-5" />
        WhatsApp
      </a>
      <Link
        href="/teklif-al"
        className="flex h-full flex-col items-center justify-center gap-0.5 bg-brand-700 text-xs font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <Send className="h-5 w-5" />
        Teklif Al
      </Link>
    </nav>
  );
}
