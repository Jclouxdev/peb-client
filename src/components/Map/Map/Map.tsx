import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useLeafletContext } from "@react-leaflet/core";
import "leaflet/dist/leaflet.css";
import LeadletMyPosition from "../Marker/LocationMarker";
import MyMarker from "../Marker/AddMarker";
import IMarker from "../../../pages/App/IMarker";
import "./map.css";
import MapContent from "../MapContent/MapContent";

const Maped = ({
  data,
  selectedMarkerId,
}: {
  data: IMarker[] | undefined;
  selectedMarkerId: string | undefined;
}) => {
  // const maxContext = useLeafletContext();
  return (
    <div>
      <MapContainer
        center={[44.85406584383385, -0.5661597118590191]}
        zoom={12}
        scrollWheelZoom={true}
        className="map"
      >
        <MapContent markers={data} selectedMarker={selectedMarkerId} />
      </MapContainer>
    </div>
  );
};

export default Maped;
