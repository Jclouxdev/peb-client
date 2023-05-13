import { Marker, Popup, TileLayer } from "react-leaflet";
import MyMarker from "../Marker/AddMarker";
import LeadletMyPosition from "../Marker/LocationMarker";
import IMarker from "../../../pages/App/IMarker";
import L from "leaflet";
import { useLeafletContext } from "@react-leaflet/core";
import { useEffect } from "react";

const icon = new L.Icon({
  iconUrl: "https://cdn4.iconfinder.com/data/icons/map-pins-2/256/19-512.png",
  iconSize: [30, 30],
});

const MapContent = ({
  markers,
  selectedMarker,
}: {
  markers: IMarker[] | undefined;
  selectedMarker: string | undefined;
}) => {
  const mapContext = useLeafletContext();

  useEffect(() => {
    if (!selectedMarker || !markers) {
      return;
    }
    const getMarker = markers.find((marker) => marker.id === selectedMarker);
    if (!getMarker) {
      return;
    }

    const latlgn = L.latLng(
      parseFloat(getMarker.lat),
      parseFloat(getMarker.lon)
    );
    mapContext.map.flyTo(latlgn, 16); 
  }, [selectedMarker]);

  return (
    <>
      <TileLayer
        attribution='&amp;copy <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selectedMarker && <>{}</>}
      {markers && markers.length > 0 ? (
        markers.map((place) => {
          return (
            <Marker
              key={place.id}
              position={[parseFloat(place.lat), parseFloat(place.lon)]}
              icon={icon}
            >
              <Popup>
                <h2>{place.name}</h2>
                <p>{place.description}</p>
              </Popup>
            </Marker>
          );
        })
      ) : (
        <p>No data available.</p>
      )}
      <MyMarker />
      <LeadletMyPosition />
    </>
  );
};

export default MapContent;
