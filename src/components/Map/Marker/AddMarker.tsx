import { useState } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { FormPopup } from "../FormPopup";
import LeafletControl from "../Control/ControlCLass";
import { ActionIcon } from "@mantine/core";
import { MapPin } from "tabler-icons-react";
import "./Marker.css"
import axios from 'axios';


interface LeafletMyMarkerProps {}

const MyMarker: React.FC<LeafletMyMarkerProps> = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [markerData, setMarkerData] = useState<any>({});
  const map = useMap()

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await axios.post("/markers", data);
      console.log(response);
      setLoading(false);
      setShowPopup(false);
      setMarkerData({});
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handlePopupOpen = (event: any) => {
    setShowPopup(true);
    const { lat, lng } = event.latlng;
    setMarkerData({ lat, lon: lng });
  }

  const handleClick = () => {
    setLoading(true);
    map.on("click", handlePopupOpen);
    map.on("click", function (e) {
    const marker = L.marker(e.latlng).addTo(map);
    console.log(marker);
    marker
    .bindPopup(`FetchInfo`)
    .openPopup();
    setLoading(false)
    });
    }

  return ( 
    <LeafletControl position={"bottomleft"}>
      <ActionIcon
        onClick={handleClick}
        loading={loading}
        variant={"transparent"}
      >
      <MapPin className="styleIcon"/>
      </ActionIcon>
      {showPopup && (
        <FormPopup
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          onSubmit={handleSubmit}
          data={markerData}
        />
      )}
    </LeafletControl>
  );
};
export default MyMarker;





