import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38],
});

const position = [1.3521, 103.8198];

function ResetCenterView(props) {
  const { selectPosition } = props;
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition?.lat, selectPosition?.lon),
        map.getZoom(),
        {
          animate: true,
        }
      );
    }
  }, [selectPosition, map]);

  return null;
}

export default function Maps(props) {
  const { selectPosition } = props;
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
      <MapContainer
        center={position}
        zoom={10}
        style={{ width: "100%", height: "400px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selectPosition && (
          <Marker position={locationSelection} icon={icon}>
            <Popup>Searched Location</Popup>
          </Marker>
        )}
        <ResetCenterView selectPosition={selectPosition} />
      </MapContainer>
    </div>
  );
}
