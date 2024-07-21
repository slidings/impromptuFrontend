import "../../_theme_files/css/styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";

// Create custom icon
const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38], // size of the icon
});

// Custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

// Function to extract latitude and longitude from the location string
const extractLatLon = (location) => {
  const matches = location.match(/\(([^)]+)\)/);
  if (matches) {
    const [lat, lon] = matches[1].split(',').map(Number);
    return { lat, lon };
  }
  return { lat: 1.2966, lon: 103.7764 }; // default coordinates if extraction fails
};

export default function Map({ location }) {
  const { lat, lon } = extractLatLon(location);

  // Markers
  const markers = [
    {
      geocode: [lat, lon],
      popUp: location,
    },
  ];

  return (
    <MapContainer center={[lat, lon]} zoom={15} style={{ width: "100%", height: "400px", margin: "0 auto" }}>
      {/* Google Maps Tiles */}
      <TileLayer
        attribution="Google Maps"
        url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" // terrain
        maxZoom={20}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      />

      <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
        {/* Mapping through the markers */}
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
