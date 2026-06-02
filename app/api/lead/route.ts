import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // TODO: E-posta entegrasyonu (Resend / Nodemailer / SMTP) buraya eklenecek.
    // Örnek:
    //   await resend.emails.send({
    //     from: "no-reply@FIRMA.com",
    //     to: "satis@FIRMA.com",
    //     subject: `Yeni ${data.variant === "seller" ? "Satıcı" : "Alıcı"} Talebi`,
    //     text: JSON.stringify(data, null, 2),
    //   });
    console.log("[lead]", new Date().toISOString(), data);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
