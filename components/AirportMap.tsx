import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Airport } from "@/types/airport";

// Fix for default marker icons in Next.js
const icon = L.icon({
  iconUrl: "/assets/icons/flight.png",
  // shadowUrl: "/marker-shadow.png",
  iconSize: [25, 25],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface AirportMapProps {
  airport: Airport;
  className?: string;
}

export default function AirportMap({
  airport,
  className = "",
}: AirportMapProps) {
  const { latitude, longitude, airport_name, city_iata_code, country_name } =
    airport;

  console.log(airport);

  return (
    <div className={`w-full h-[400px] rounded-lg overflow-hidden ${className}`}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} icon={icon}>
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-lg">{airport_name}</h3>
              <p className="text-sm text-gray-600">
                {city_iata_code}, {country_name}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
