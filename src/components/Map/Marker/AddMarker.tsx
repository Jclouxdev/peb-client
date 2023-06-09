import { useState } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { ModalPopup } from "../FormPopup";
import LeafletControl from "../Control/ControlCLass";
import { ActionIcon } from "@mantine/core";
import { MapPin } from "tabler-icons-react";
import "./Marker.css";
import "../Form.css";

interface LeafletMyMarkerProps {}

var redIcon = L.icon({
  iconUrl: "/src/assets/location-pin-connectsafely-37.png",
  iconSize: [40, 40], // size of the icon
});

const MyMarker: React.FC<LeafletMyMarkerProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const map = useMap();
  const [latPosition, setLatPosition] = useState({});
  const [lngPosition, setLngPosition] = useState({});

  const handleClick = () => {
    setLoading(true);
    map.on("click", function (e) {
      setShowPopup(true);
      const marker = L.marker(e.latlng, { icon: redIcon }).addTo(map);
      // console.log(marker);
      const { lat, lng } = marker.getLatLng();
      setLatPosition(lat);
      setLngPosition(lng);
      setLoading(false);
      map.off("click");
    });
  };

  return (
    <>
      <LeafletControl position={"bottomleft"}>
        <ActionIcon
          onClick={handleClick}
          loading={loading}
          variant={"transparent"}
          disabled={showPopup ? true : false}
          className="placeMarker__button"
        >
          <MapPin className="styleIcon" />
        </ActionIcon>
      </LeafletControl>
      <div className="popup-wrapper">
        <LeafletControl>
          {showPopup && (
            <ModalPopup
              setShowPopup={setShowPopup}
              latPosition={latPosition}
              lngPosition={lngPosition}
            />
          )}
        </LeafletControl>
      </div>
    </>
  );
};
export default MyMarker;
