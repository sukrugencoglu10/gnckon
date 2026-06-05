// ★ TEK DOSYA — gerçek bilgilerinizi buraya yazın.
export const site = {
  name: "FIRMA_ADI",
  legalName: "FIRMA_ADI Konteyner Sanayi ve Ticaret Ltd. Şti.",
  tagline: "Türkiye'nin satılık yük konteyneri merkezi",
  description:
    "Yeni ve 2. el 20 ft, 40 ft, High Cube, Reefer (soğutuculu) ve Flat Rack konteynerler. Türkiye geneli teslimat, garantili ürün, anında fiyat.",
  phone: "+90 5XX XXX XX XX",
  phoneRaw: "+905XXXXXXXXX", // tel: linkleri
  whatsapp: "905XXXXXXXXX", // wa.me/
  email: "info@FIRMA.com",
  address: "Mahalle, Sokak No, İlçe / Şehir",
  city: "İstanbul",
  region: "Türkiye",
  url: "https://FIRMA.com",
  hours: "Pzt–Cmt 09:00–18:00",
  experienceYears: 10,
  social: {
    instagram: "",
    facebook: "",
    youtube: "",
  },
} as const;

export const nav = [
  { href: "/", label: "Anasayfa" },
  { href: "/konteynerler", label: "Konteynerler" },
  { href: "/konteynerimi-sat", label: "Konteynerimi Sat" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
] as const;
