export type ContainerType =
  | "20ft"
  | "40ft"
  | "40ft-hc"
  | "20ft-reefer"
  | "40ft-reefer"
  | "flat-rack";

export type ContainerCondition = "yeni" | "ikinci-el";

export interface Container {
  slug: string;
  title: string;
  type: ContainerType;
  typeLabel: string;
  condition: ContainerCondition;
  sizeFt: 20 | 40;
  priceTRY: number;
  city: string;
  shortDesc: string;
  description: string;
  image: string; // /images/containers/...
  specs: Record<string, string>;
  featured?: boolean;
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
      "Sıfır üretim 20 ft standart kuru yük konteyneri. ISO 668 standartlarında, CSC sertifikalı, su geçirmez kontrplak tabanlı. Kara, deniz ve depo amaçlı kullanıma uygun.",
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
      "Wind & Watertight (WWT) 2. el 20 ft konteyner. Yapısal olarak sağlam, kontrol edilmiş ve teslim öncesi temizlenmiş.",
    image: img("20ft-2el.svg"),
    specs: {
      "Dış Boyut": "6.06 × 2.44 × 2.59 m",
      "İç Hacim": "33.2 m³",
      Durum: "WWT (Wind & Watertight)",
      Boya: "Yenilenebilir",
      Sertifika: "Yapısal Kontrol Belgesi",
    },
    featured: true,
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
      "40 ft standart kuru yük konteyneri. Geniş hacmiyle uzun ürünler, mobilya ve genel kargo için en uygun çözüm.",
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
    slug: "40-ft-high-cube-konteyner",
    title: "40 ft High Cube (HC) Konteyner",
    type: "40ft-hc",
    typeLabel: "40 ft High Cube",
    condition: "yeni",
    sizeFt: 40,
    priceTRY: 255000,
    city: "İstanbul",
    shortDesc: "Standartın 30 cm yükseği — hacimli yük taşıma şampiyonu.",
    description:
      "40 ft High Cube konteyner, standart 40 ft'e göre 30 cm daha yüksektir. Hafif ama hacimli yükler için ideal.",
    image: img("40ft-hc.svg"),
    specs: {
      "Dış Boyut": "12.19 × 2.44 × 2.89 m",
      "İç Hacim": "76.4 m³",
      "Boş Ağırlık": "3.900 kg",
      "Yük Kapasitesi": "28.600 kg",
    },
    featured: true,
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
      "20 ft reefer (soğutuculu) konteyner. Gıda, ilaç ve hassas yüklerin nakliyesi ve depolanması için uygundur.",
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
      "40 ft reefer konteyner. Et, balık, taze sebze-meyve ihracatı ve büyük ölçekli soğuk depo uygulamaları için.",
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
    type: "flat-rack",
    typeLabel: "Flat Rack",
    condition: "yeni",
    sizeFt: 20,
    priceTRY: 215000,
    city: "Mersin",
    shortDesc: "Ağır ve gabari dışı yükler için açık platform konteyner.",
    description:
      "20 ft flat rack (açık platform) konteyner. İş makineleri, çelik konstrüksiyon, boru, bobin ve büyük makine parçalarının taşınması için tasarlanmıştır. Yan duvarlar yoktur; uç duvarlar katlanabilir tiptedir.",
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
      "Cargo Worthy (CW) 2. el 40 ft konteyner. Yapısal ve estetik olarak iyi durumda, depo ve şantiye için uygun fiyatlı çözüm.",
    image: img("40ft-2el.svg"),
    specs: {
      "Dış Boyut": "12.19 × 2.44 × 2.59 m",
      Durum: "Cargo Worthy",
      Boya: "Mevcut, tazelenebilir",
    },
  },
];

export const typeOptions: { value: ContainerType | "all"; label: string }[] = [
  { value: "all", label: "Tümü" },
  { value: "20ft", label: "20 ft Standart" },
  { value: "40ft", label: "40 ft Standart" },
  { value: "40ft-hc", label: "40 ft High Cube" },
  { value: "20ft-reefer", label: "20 ft Reefer" },
  { value: "40ft-reefer", label: "40 ft Reefer" },
  { value: "flat-rack", label: "Flat Rack" },
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
