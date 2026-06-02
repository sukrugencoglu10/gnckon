import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // .env.local dosyasında tanımlı olan veya sonradan eklenecek olan Apps Script Web App URL'si
    const scriptUrl = process.env.APPS_SCRIPT_URL || "BURAYA_URL_GELECEK";

    // Apps Script'e veriyi yolla
    if (scriptUrl && scriptUrl !== "BURAYA_URL_GELECEK") {
      const scriptRes = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!scriptRes.ok) {
        console.error("Apps Script Hatası:", await scriptRes.text());
        throw new Error("Apps Script'e gönderilemedi");
      }
    } else {
      console.warn("UYARI: APPS_SCRIPT_URL tanımlanmadığı için e-posta gönderimi atlandı.", data);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Form gönderim hatası:", e);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
