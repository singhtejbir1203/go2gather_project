import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import L from "leaflet";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function RouteMap({ geometry }) {
  if (!geometry || !geometry.coordinates) return null;

  const positions = geometry.coordinates.map(([lng, lat]) => [lat, lng]);

  const start = positions[0];
  const end = positions[positions.length - 1];

  return (
    <MapContainer
      center={start}
      zoom={10}
      scrollWheelZoom={false}
      className="h-64 w-full rounded mt-6"
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Polyline positions={positions} />

      <Marker position={start} />
      <Marker position={end} />
    </MapContainer>
  );
}

export default RouteMap;
