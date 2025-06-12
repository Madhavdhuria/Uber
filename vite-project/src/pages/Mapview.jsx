import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

const RecenterMap = ({ position }) => {
  const map = useMap();
  const [hasCentered, setHasCentered] = useState(false);

  useEffect(() => {
    if (position && !hasCentered) {
      map.setView(position, 17);
      setHasCentered(true);
    }
  }, [position, hasCentered, map]);

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

  if (!position) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg">Loading map...</p>
        </div>
      </div>
    );
  }

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
