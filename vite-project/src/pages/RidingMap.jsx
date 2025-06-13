import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import L from "leaflet";
import axios from "axios";

const LiveMarker = ({ position }) => {
  const map = useMap();
  const markerRef = useRef(null);

  useEffect(() => {
    if (!position) return;

    if (!markerRef.current) {
      const marker = L.marker(position, {
        icon: L.icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
        }),
      }).addTo(map);

      markerRef.current = marker;
    } else {
      markerRef.current.setLatLng(position);
    }
  }, [position, map]);

  return null;
};

const RoutingControl = ({ from, to }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !from || !to) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
      lineOptions: {
        styles: [{ color: "#1E90FF", weight: 5 }],
      },
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      show: false,
      createMarker: (i, wp) =>
        L.marker(wp.latLng, {
          icon: L.icon({
            iconUrl:
              i === 0
                ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png"
                : "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            shadowUrl:
              "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
          }),
        }),
    });

    routingControl.addTo(map);

    const container = document.querySelector(".leaflet-routing-container");
    if (container) container.style.display = "none";

    return () => map.removeControl(routingControl);
  }, [map, from, to]);

  return null;
};

const RidingMap = ({ data }) => {
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);

  // Live location tracking
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setSource([latitude, longitude]);
      },
      () => {
        setSource([28.6448, 77.216721]); // fallback
      },
      { enableHighAccuracy: true, maximumAge: 1000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Destination from backend
  useEffect(() => {
    if (!data?.destination) return;

    const fetchCoordinates = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-coordinates`,
          { params: { address: data.destination } }
        );
        const { lat, lng } = res.data;
        setDestination([lat, lng]);
      } catch (err) {
        console.error("Failed to fetch destination coordinates:", err);
      }
    };

    fetchCoordinates();
  }, [data?.destination]);

  if (!source || !destination) return <p>Loading map...</p>;

  return (
    <MapContainer
      center={source}
      zoom={14}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RoutingControl from={source} to={destination} />
      <LiveMarker position={source} />
    </MapContainer>
  );
};

export default RidingMap;
