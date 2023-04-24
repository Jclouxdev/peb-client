import { useState } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { FormPopup } from "../FormPopup";
import LeafletControl from "../Control/ControlCLass";
import { ActionIcon } from "@mantine/core";
import { MapPin } from "tabler-icons-react";
import "./Marker.css"

interface LeafletMyMarkerProps {}

const MyMarker: React.FC<LeafletMyMarkerProps> = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const map = useMap()

  const handleClick = () => {
    setLoading(true);
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
    </LeafletControl>
  );
};
export default MyMarker;





