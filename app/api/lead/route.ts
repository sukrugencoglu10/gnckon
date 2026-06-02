import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // .env.local dosyasında tanımlı olan veya sonradan eklenecek olan Apps Script Web App URL'si
    const scriptUrl = process.env.APPS_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbxPamiXON3_PuL_H6d8c7tDPACrdP3icExwyVgio54g37CL7ThMUMZoqC08zf0wdPg5rA/exec";

    // Apps Script'e veriyi yolla
    if (scriptUrl && scriptUrl !== "BURAYA_URL_GELECEK") {
      const scriptRes = await fetch(scriptUrl, {
        method: "POST",
        // Google Apps Script redirect döner. Next.js'in bunu takip edip takılmasını önlemek için manual yapıyoruz.
        redirect: "manual", 
        body: JSON.stringify(data),
      });

      // 302 (Found/Redirect) veya 200 dönerse başarılı sayılır.
      if (!scriptRes.ok && scriptRes.status !== 302) {
        console.error("Apps Script Hatası, Status:", scriptRes.status);
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
