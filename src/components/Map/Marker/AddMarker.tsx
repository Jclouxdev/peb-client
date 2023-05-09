import { useState } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { ModalPopup } from "../FormPopup";
import LeafletControl from "../Control/ControlCLass";
import { ActionIcon } from "@mantine/core";
import { MapPin } from "tabler-icons-react";
import "./Marker.css"
import "../Form.css"
import ICategorie from "../../../pages/App/ICategorie";


interface LeafletMyMarkerProps {

}

const MyMarker: React.FC<LeafletMyMarkerProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [markerData, setMarkerData] = useState<any>({});
  const map = useMap()
  const [latPosition, setLatPosition] = useState({});
  const [lngPosition, setLngPosition] = useState({});

  const handleSubmit = async (data) => {
    setShowPopup(false)
    setMarkerData(data)
  }

  const handlePopupOpen = (event: any) => {
    setShowPopup(true);
  }

  const handleClick = () => {
    setLoading(true);
    map.on("click", handlePopupOpen);
    map.on("click", function (e) {
    const marker = L.marker(e.latlng).addTo(map);
    console.log(marker);
    const {lat, lng} = marker.getLatLng()
    setLatPosition(lat)
    setLngPosition(lng)
    marker
    .bindPopup(`<div><b>${markerData.name}</b><br>${markerData.description}<br><em>${markerData.categorie}</em></div>`)
    .openPopup();
    setLoading(false)
    });
    }

  return ( 
    <div>
      <LeafletControl position={"bottomleft"}>
        <ActionIcon
          onClick={handleClick}
          loading={loading}
          variant={"transparent"}
        >
        <MapPin className="styleIcon"/>
        </ActionIcon>
      </LeafletControl>
      <div className="popup-wrapper">
      <LeafletControl>
      {showPopup && (
        <ModalPopup onSubmit={handleSubmit} latPosition={latPosition} lngPosition={lngPosition}/>
      )}
      </LeafletControl>
      </div>
    </div>
  );
};
export default MyMarker;





