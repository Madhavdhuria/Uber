import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

const RecenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 17);
    }
  }, [position, map]);
  return null;
};

const MapView = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        console.log("LAT:", latitude, "LNG:", longitude);
      },
      (err) => {
        console.error("❌ Location error:", err.message);
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (!position) return <p>Loading map...</p>;

  return (
    <MapContainer center={position} zoom={17} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>Your Location (Live)</Popup>
      </Marker>
      <RecenterMap position={position} />
    </MapContainer>
  );
};

export default MapView;
