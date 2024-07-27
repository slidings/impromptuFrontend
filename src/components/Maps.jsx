import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L, { Icon, divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../_theme_files/css/styles.css";

// Create custom icon
const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38], // size of the icon
});

// Custom cluster icon
const createClusterCustomIcon = (cluster) => {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

function ResetCenterView({ selectPosition }) {
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

export default function Maps({ selectPosition, latitude, longitude, location }) {
  const lat = latitude || 1.2966; // default latitude if not provided
  const lon = longitude || 103.7764; // default longitude if not provided
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];

  // Markers
  const markers = selectPosition
    ? [
        {
          geocode: locationSelection,
          popUp: "Searched Location",
        },
      ]
    : [
        {
          geocode: [lat, lon],
          popUp: location,
        },
      ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
      <MapContainer
        center={selectPosition ? locationSelection : [lat, lon]}
        zoom={15}
        style={{ width: "100%", height: "400px", margin: "0 auto" }}
      >
        <TileLayer
          attribution="Google Maps"
          url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" // terrain
          maxZoom={20}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />

        <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

        <ResetCenterView selectPosition={selectPosition} />
      </MapContainer>
    </div>
  );
}
