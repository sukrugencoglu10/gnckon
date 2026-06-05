export type ContainerType =
  | "20ft"
  | "40ft"
  | "40ft-hc"
  | "45ft-hc"
  | "20ft-reefer"
  | "40ft-reefer"
  | "20ft-flat-rack"
  | "40ft-flat-rack"
  | "20ft-open-top"
  | "40ft-open-top"
  | "swapbody";

export type ContainerCondition = "yeni" | "ikinci-el";

export interface Container {
  slug: string;
  title: string;
  type: ContainerType;
  typeLabel: string;
  condition: ContainerCondition;
  sizeFt: 20 | 40 | 45 | null;
  priceTRY: number;
  city: string;
  shortDesc: string;
  description: string;
  image: string; // /images/containers/...
  specs: Record<string, string>;
  featured?: boolean;
  deliveryStatus?: "Hemen Teslim" | "Siparişe Özel";
}

const img = (n: string) => `/images/containers/${n}`;

export const containers: Container[] = [
  {
    slug: "20-ft-standart-konteyner-yeni",
    title: "20 ft Standart Konteyner — Yeni",
    type: "20ft",
    typeLabel: "20 ft Standart",
    condition: "yeni",
    sizeFt: 20,
    priceTRY: 145000,
    city: "İstanbul",
    shortDesc: "Sıfır, ISO standartlarında, kuru yük taşımacılığı için ideal.",
    description:
      "Sıfır 20 ft standart kuru yük konteyneri. ISO 668 standartlarında, CSC sertifikalı, su geçirmez kontrplak tabanlı. Kara, deniz ve depo amaçlı kullanıma uygun.",
    image: img("20ft-standart.svg"),
    specs: {
      "Dış Boyut": "6.06 × 2.44 × 2.59 m",
      "İç Hacim": "33.2 m³",
      "Boş Ağırlık": "2.250 kg",
      "Yük Kapasitesi": "28.130 kg",
      Sertifika: "CSC / ISO 668",
      Garanti: "2 Yıl",
    },
    featured: true,
  },
  {
    slug: "20-ft-standart-konteyner-2-el",
    title: "20 ft Standart Konteyner — 2. El",
    type: "20ft",
    typeLabel: "20 ft Standart",
    condition: "ikinci-el",
    sizeFt: 20,
    priceTRY: 72000,
    city: "İzmir",
    shortDesc: "Bakımlı 2. el, depo ve şantiye için ekonomik çözüm.",
    description:
      "2. El 20 ft konteyner. Wind & Watertight (WWT) sertifikalı, yapısal olarak sağlam, kontrol edilmiş ve teslim öncesi temizlenmiş.",
    image: img("20ft-2el.svg"),
    specs: {
      "Dış Boyut": "6.06 × 2.44 × 2.59 m",
      "İç Hacim": "33.2 m³",
      Durum: "WWT (Wind & Watertight)",
      Boya: "Yenilenebilir",
      Sertifika: "Yapısal Kontrol Belgesi",
    },
  },
  {
    slug: "40-ft-standart-konteyner",
    title: "40 ft Standart Konteyner",
    type: "40ft",
    typeLabel: "40 ft Standart",
    condition: "yeni",
    sizeFt: 40,
    priceTRY: 235000,
    city: "İstanbul",
    shortDesc: "Büyük hacimli yükler için, ihracat-ithalat uyumlu.",
    description:
      "Sıfır 40 ft standart kuru yük konteyneri. Geniş hacmiyle uzun ürünler, mobilya ve genel kargo için en uygun çözüm.",
    image: img("40ft-standart.svg"),
    specs: {
      "Dış Boyut": "12.19 × 2.44 × 2.59 m",
      "İç Hacim": "67.7 m³",
      "Boş Ağırlık": "3.750 kg",
      "Yük Kapasitesi": "26.730 kg",
      Sertifika: "CSC / ISO 668",
    },
    featured: true,
  },
  {
    slug: "40-ft-open-top-konteyner",
    title: "40 ft Open Top Konteyner",
    type: "40ft-open-top",
    typeLabel: "40 ft Open Top",
    condition: "yeni",
    sizeFt: 40,
    priceTRY: 310000,
    city: "İstanbul",
    shortDesc: "Üstten yükleme gerektiren makine vb. yükler için branda kapaklı.",
    description:
      "Sıfır 40 ft Open Top konteyner, tavanı tamamen açılabilen ve branda (tarp) ile örtülen yapısıyla, vinç yardımıyla üstten yüklenmesi gereken ağır sanayi yükleri için idealdir.",
    image: img("40ft-open-top.svg"),
    specs: {
      "Dış Boyut": "12.19 × 2.44 × 2.59 m",
      "İç Hacim": "66.5 m³",
      "Boş Ağırlık": "3.850 kg",
      "Çatı Tipi": "Çıkarılabilir Profil + Branda",
      "Yük Kapasitesi": "26.630 kg",
    },
    featured: true,
    deliveryStatus: "Siparişe Özel",
  },
  {
    slug: "20-ft-reefer-sogutuculu-konteyner",
    title: "20 ft Reefer (Soğutuculu) Konteyner",
    type: "20ft-reefer",
    typeLabel: "20 ft Reefer",
    condition: "yeni",
    sizeFt: 20,
    priceTRY: 545000,
    city: "Mersin",
    shortDesc: "-25°C / +25°C arası, Carrier/Thermo King ünite seçenekli.",
    description:
      "Sıfır 20 ft reefer (soğutuculu) konteyner. Gıda, ilaç ve hassas yüklerin nakliyesi ve depolanması için uygundur.",
    image: img("20ft-reefer.svg"),
    specs: {
      "Sıcaklık Aralığı": "-25°C ÷ +25°C",
      Ünite: "Carrier / Thermo King",
      "İç Hacim": "28.3 m³",
      Voltaj: "380V / 50Hz",
    },
    featured: true,
  },
  {
    slug: "40-ft-reefer-sogutuculu-konteyner",
    title: "40 ft Reefer (Soğutuculu) Konteyner",
    type: "40ft-reefer",
    typeLabel: "40 ft Reefer",
    condition: "yeni",
    sizeFt: 40,
    priceTRY: 845000,
    city: "İzmir",
    shortDesc: "Büyük hacimli soğuk zincir lojistiği için.",
    description:
      "Sıfır 40 ft reefer konteyner. Et, balık, taze sebze-meyve ihracatı ve büyük ölçekli soğuk depo uygulamaları için.",
    image: img("40ft-reefer.svg"),
    specs: {
      "Sıcaklık Aralığı": "-30°C ÷ +30°C",
      Ünite: "Carrier / Thermo King",
      "İç Hacim": "59.3 m³",
      Voltaj: "380V / 50Hz",
    },
  },
  {
    slug: "20-ft-flat-rack-konteyner",
    title: "20 ft Flat Rack Konteyner",
    type: "20ft-flat-rack",
    typeLabel: "20 ft Flat Rack",
    condition: "yeni",
    sizeFt: 20,
    priceTRY: 215000,
    city: "Mersin",
    shortDesc: "Ağır ve gabari dışı yükler için açık platform konteyner.",
    description:
      "Sıfır 20 ft flat rack (açık platform) konteyner. İş makineleri, çelik konstrüksiyon, boru, bobin ve büyük makine parçalarının taşınması için tasarlanmıştır. Yan duvarlar yoktur; uç duvarlar katlanabilir tiptedir.",
    image: img("flat-rack.svg"),
    specs: {
      "Dış Boyut": "6.06 × 2.44 × 2.59 m",
      "İç Yük Alanı": "5.94 × 2.35 × 2.34 m",
      "Boş Ağırlık": "2.900 kg",
      "Yük Kapasitesi": "27.100 kg",
      "Uç Duvarlar": "Katlanabilir",
      Sertifika: "CSC / ISO 1496",
    },
    featured: true,
  },
  {
    slug: "40-ft-standart-konteyner-2-el",
    title: "40 ft Standart Konteyner — 2. El",
    type: "40ft",
    typeLabel: "40 ft Standart",
    condition: "ikinci-el",
    sizeFt: 40,
    priceTRY: 118000,
    city: "Kocaeli",
    shortDesc: "Bakımlı 2. el 40 ft, depo amaçlı ideal.",
    description:
      "2. El 40 ft konteyner. Cargo Worthy (CW) kondisyonunda, yapısal ve estetik olarak iyi durumda, depo ve şantiye için uygun fiyatlı çözüm.",
    image: img("40ft-2el.svg"),
    specs: {
      "Dış Boyut": "12.19 × 2.44 × 2.59 m",
      Durum: "Cargo Worthy",
      Boya: "Mevcut, tazelenebilir",
    },
  },
  {
    slug: "40-ft-hc-konteyner",
    title: "40 ft High Cube Konteyner",
    type: "40ft-hc",
    typeLabel: "40 ft High Cube",
    condition: "yeni",
    sizeFt: 40,
    priceTRY: 265000,
    city: "İstanbul",
    shortDesc: "Ekstra yüksek hacimli, standarttan daha fazla iç hacim sunar.",
    description: "Sıfır 40 ft High Cube konteyner. Standart konteynerlere göre yaklaşık 30 cm daha yüksek olup daha fazla hacim gerektiren yükler için idealdir.",
    image: img("40ft-hc.svg"),
    specs: {
      "Dış Boyut": "11.98 × 2.35 × 2.69 m",
      "İç Hacim": "76 m³",
      "Boş Ağırlık": "3.970 kg",
      "Yük Kapasitesi": "26.780 kg"
    },
    featured: true,
  },
  {
    slug: "45-ft-hc-konteyner",
    title: "45 ft High Cube Konteyner",
    type: "45ft-hc",
    typeLabel: "45 ft High Cube",
    condition: "yeni",
    sizeFt: 45,
    priceTRY: 315000,
    city: "İstanbul",
    shortDesc: "Maksimum hacim arayanlar için en büyük ISO konteyner tipi.",
    description: "Sıfır 45 ft High Cube konteyner. Kara ve deniz yolu taşımacılığında veya çok geniş depolama gereksinimlerinde maksimum kapasite sunar.",
    image: img("40ft-hc.svg"),
    specs: {
      "Dış Boyut": "13.50 × 2.35 × 2.69 m",
      "İç Hacim": "86 m³",
      "Boş Ağırlık": "4.590 kg",
      "Yük Kapasitesi": "27.900 kg"
    }
  },
  {
    slug: "20-ft-open-top-konteyner",
    title: "20 ft Open Top Konteyner",
    type: "20ft-open-top",
    typeLabel: "20 ft Open Top",
    condition: "yeni",
    sizeFt: 20,
    priceTRY: 220000,
    city: "İzmir",
    shortDesc: "Üstten yükleme gerektiren orta boyutlu yükler için.",
    description: "Sıfır 20 ft Open Top konteyner. Tavanı açılabilen yapısıyla ağır makinelerin vinçle rahatça yüklenmesine olanak tanır.",
    image: img("40ft-open-top.svg"),
    specs: {
      "Dış Boyut": "5.89 × 2.35 × 2.35 m",
      "İç Hacim": "33 m³",
      "Boş Ağırlık": "2.400 kg",
      "Yük Kapasitesi": "21.600 kg"
    }
  },
  {
    slug: "40-ft-flat-rack-konteyner",
    title: "40 ft Flat Rack Konteyner",
    type: "40ft-flat-rack",
    typeLabel: "40 ft Flat Rack",
    condition: "yeni",
    sizeFt: 40,
    priceTRY: 340000,
    city: "Mersin",
    shortDesc: "Çok ağır ve devasa gabari dışı yükler için 40'lık açık platform.",
    description: "Sıfır 40 ft flat rack konteyner. Standart dışı boyuttaki dev iş makineleri veya geniş çelik borular için yan duvarları olmayan özel tasarım.",
    image: img("flat-rack.svg"),
    specs: {
      "Dış Boyut": "12.08 × 2.35 × 2.10 m",
      "Boş Ağırlık": "5.480 kg",
      "Uç Duvarlar": "Katlanabilir"
    }
  },
  {
    slug: "swapbody-konteyner",
    title: "Swapbody",
    type: "swapbody",
    typeLabel: "Swapbody",
    condition: "yeni",
    sizeFt: null,
    priceTRY: 390000,
    city: "Kocaeli",
    shortDesc: "Avrupa standartlarında, karayolu ve demiryolu uyumlu treyler kasası.",
    description: "Sıfır Swapbody konteyner. Özellikle Avrupa intermodal taşımacılık sistemlerinde, kamyondan trene kolayca aktarılabilen yüksek hacimli kasa.",
    image: img("40ft-hc.svg"),
    specs: {
      "Dış Boyut": "13.40 × 2.42 × 2.98 m",
      "İç Hacim": "96.5 m³"
    }
  }
];

export const typeOptions: { value: ContainerType | "all"; label: string }[] = [
  { value: "all", label: "Tümü" },
  { value: "20ft", label: "20 ft Standart" },
  { value: "40ft", label: "40 ft Standart" },
  { value: "40ft-hc", label: "40 ft High Cube" },
  { value: "45ft-hc", label: "45 ft High Cube" },
  { value: "20ft-reefer", label: "20 ft Reefer" },
  { value: "40ft-reefer", label: "40 ft Reefer" },
  { value: "20ft-flat-rack", label: "20 ft Flat Rack" },
  { value: "40ft-flat-rack", label: "40 ft Flat Rack" },
  { value: "20ft-open-top", label: "20 ft Open Top" },
  { value: "40ft-open-top", label: "40 ft Open Top" },
  { value: "swapbody", label: "Swapbody" },
];

export const sizeOptions = [
  { value: "20ft", label: "20 ft" },
  { value: "40ft", label: "40 ft" },
  { value: "40ft-hc", label: "40 ft High Cube" },
  { value: "45ft-hc", label: "45 ft High Cube" },
];

export const categoryOptions = [
  { value: "standard_cargo", label: "Standart Yük Konteyneri" },
  { value: "refrigerated", label: "Reefer Konteyneri" },
  { value: "flat_rack", label: "Flat Rack Konteyneri" },
  { value: "open_top", label: "Open Top Konteyneri" },
  { value: "custom", label: "Özel Üretim" },
];

export const regionOptions = [
  { value: "istanbul_avrupa", label: "İstanbul (Avrupa)" },
  { value: "istanbul_anadolu", label: "İstanbul (Anadolu)" },
  { value: "kocaeli_gebze", label: "Kocaeli (Gebze)" },
  { value: "izmir_aliaga", label: "İzmir (Aliağa)" },
  { value: "mersin", label: "Mersin" },
  { value: "gemlik", label: "Bursa (Gemlik)" },
  { value: "iskenderun", label: "İskenderun" },
  { value: "samsun", label: "Samsun" },
  { value: "antalya", label: "Antalya" },
  { value: "diger", label: "Diğer / Belirtilmemiş" },
];

export function getContainer(slug: string): Container | undefined {
  return containers.find((c) => c.slug === slug);
}

export function featuredContainers() {
  return containers.filter((c) => c.featured);
}

export function similarContainers(slug: string, limit = 3) {
  const me = getContainer(slug);
  if (!me) return [];
  return containers
    .filter((c) => c.slug !== slug)
    .sort((a, b) => Number(b.type === me.type) - Number(a.type === me.type))
    .slice(0, limit);
}

export function formatTRY(n: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(n);
}
