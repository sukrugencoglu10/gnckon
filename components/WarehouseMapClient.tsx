"use client";

import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { MapPin, Search, Navigation } from "lucide-react";

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

const warehouses: Location[] = [
  { id: "izmir", name: "İzmir Depo", lat: 38.4237, lng: 27.1428 },
  { id: "gebze", name: "Gebze Depo", lat: 40.8028, lng: 29.4307 },
  { id: "istanbul", name: "İstanbul (Ambarlı) Depo", lat: 40.9772, lng: 28.6825 },
  { id: "ankara", name: "Ankara Depo", lat: 39.9334, lng: 32.8597 },
  { id: "mersin", name: "Mersin Liman Depo", lat: 36.8000, lng: 34.6333 },
  { id: "antalya", name: "Antalya Depo", lat: 36.8969, lng: 30.7133 },
];

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return Math.round(d);
}

// Haritayı verilen lokasyona uçurmak için yardımcı bileşen
function MapController({ center, bounds }: { center: [number, number], bounds?: [[number, number], [number, number]] | null }) {
  const map = useMap();
  if (bounds) {
    map.fitBounds(bounds, { padding: [50, 50], animate: true, duration: 1 });
  } else {
    map.flyTo(center, 6, { animate: true, duration: 1 });
  }
  return null;
}

export default function WarehouseMapClient() {
  const [selectedWarehouse, setSelectedWarehouse] = useState<Location | null>(warehouses[0]);
  const [userLocationInput, setUserLocationInput] = useState("");
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [mapCenter, setMapCenter] = useState<[number, number]>([warehouses[0].lat, warehouses[0].lng]);
  const [mapBounds, setMapBounds] = useState<[[number, number], [number, number]] | null>(null);
  const [routePath, setRoutePath] = useState<[number, number][] | null>(null);

  const handleCalculate = async () => {
    if (!selectedWarehouse) {
      setErrorMsg("Lütfen haritadan veya listeden bir depo seçiniz.");
      return;
    }
    if (!userLocationInput.trim()) {
      setErrorMsg("Lütfen bulunduğunuz şehri/ilçeyi giriniz.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");
    setDistance(null);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          userLocationInput
        )}&format=json&limit=1&countrycodes=tr`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const uLat = parseFloat(data[0].lat);
        const uLng = parseFloat(data[0].lon);
        setUserCoords({ lat: uLat, lng: uLng });

        try {
          const osrmRes = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${selectedWarehouse.lng},${selectedWarehouse.lat};${uLng},${uLat}?overview=full&geometries=geojson`
          );
          const osrmData = await osrmRes.json();

          if (osrmData.code === "Ok" && osrmData.routes.length > 0) {
            const route = osrmData.routes[0];
            setDistance(Math.round(route.distance / 1000));
            
            const path: [number, number][] = route.geometry.coordinates.map((c: number[]) => [c[1], c[0]]);
            setRoutePath(path);
          } else {
            throw new Error("No route");
          }
        } catch(e) {
          const dist = getDistanceFromLatLonInKm(selectedWarehouse.lat, selectedWarehouse.lng, uLat, uLng);
          setDistance(Math.round(dist * 1.2));
          setRoutePath([[selectedWarehouse.lat, selectedWarehouse.lng], [uLat, uLng]]);
        }
        
        // Haritayı iki noktanın ortasına alalım
        setMapCenter([(selectedWarehouse.lat + uLat) / 2, (selectedWarehouse.lng + uLng) / 2]);
        setMapBounds([
          [selectedWarehouse.lat, selectedWarehouse.lng],
          [uLat, uLng],
        ]);
      } else {
        setErrorMsg("Girdiğiniz konum bulunamadı. Lütfen daha belirgin bir il/ilçe giriniz.");
      }
    } catch (err) {
      setErrorMsg("Mesafe hesaplanırken bir hata oluştu. Lütfen tekrar deneyiniz.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-x py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-ink-900 tracking-tight">Depo Lokasyonları ve Mesafe</h2>
        <p className="mt-4 text-ink-500 max-w-2xl mx-auto">
          Size en yakın depomuzu seçerek tahmini teslimat mesafesini anında hesaplayın.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Sol Panel: Seçim ve Hesaplama */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-xl ring-1 ring-black/5">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-brand-500" />
            Mesafe Hesaplayıcı
          </h3>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">1. Depo Seçin</label>
              <div className="grid grid-cols-2 gap-2">
                {warehouses.map((wh) => (
                  <button
                    key={wh.id}
                    onClick={() => {
                      setSelectedWarehouse(wh);
                      setMapCenter([wh.lat, wh.lng]);
                      setMapBounds(null);
                      setRoutePath(null);
                      setErrorMsg("");
                    }}
                    className={`text-sm py-2 px-3 rounded-lg border transition-colors text-left font-medium ${
                      selectedWarehouse?.id === wh.id
                        ? "bg-brand-50 border-brand-500 text-brand-700"
                        : "bg-white border-slate-200 text-ink-600 hover:border-brand-300"
                    }`}
                  >
                    {wh.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">2. Konumunuz (İl, İlçe)</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Örn: Karşıyaka, İzmir"
                  value={userLocationInput}
                  onChange={(e) => setUserLocationInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm font-medium"
                  onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
                />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </div>

            <button
              onClick={handleCalculate}
              disabled={isLoading}
              className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-brand-500/30 transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Mesafe Hesapla
                </>
              )}
            </button>

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg font-medium">
                {errorMsg}
              </div>
            )}

            {distance !== null && selectedWarehouse && userCoords && (
              <div className="mt-6 p-5 bg-gradient-to-br from-brand-50 to-orange-50 border border-brand-100 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Navigation className="w-16 h-16" />
                </div>
                <p className="text-sm font-semibold text-ink-600 mb-1">Tahmini Karayolu Mesafesi:</p>
                <div className="flex items-end gap-2 text-brand-700">
                  <span className="text-4xl font-extrabold">{distance}</span>
                  <span className="text-xl font-bold pb-1">km</span>
                </div>
                <p className="text-xs text-ink-500 mt-2 font-medium">
                  {selectedWarehouse.name} ile belirttiğiniz konum arasındaki tahmini mesafe.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sağ Panel: Harita */}
        <div className="lg:col-span-2 h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 z-0">
          <MapContainer
            center={mapCenter}
            zoom={5}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Depo Markerları */}
            {warehouses.map((wh) => (
              <Marker
                key={wh.id}
                position={[wh.lat, wh.lng]}
                eventHandlers={{
                  click: () => {
                    setSelectedWarehouse(wh);
                  },
                }}
              >
                <Popup>
                  <div className="font-bold text-ink-900">{wh.name}</div>
                  <button 
                    onClick={() => setSelectedWarehouse(wh)}
                    className="text-xs text-brand-600 mt-1 hover:underline font-semibold"
                  >
                    Bu depoyu seç
                  </button>
                </Popup>
              </Marker>
            ))}

            {/* Kullanıcı Konumu Markerı */}
            {userCoords && (
              <Marker position={[userCoords.lat, userCoords.lng]}>
                <Popup>Sizin Konumunuz</Popup>
              </Marker>
            )}

            {userCoords && selectedWarehouse && routePath && (
              <Polyline
                positions={routePath}
                color="#f97316" // Turuncu (brand)
                weight={5}
                opacity={0.8}
              />
            )}

            <MapController center={mapCenter} bounds={mapBounds} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
