import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { FormPopup } from "./FormPopup";

const MyMarker = () => {
  const map = useMap();

  useEffect(() => {
    map.on("click", function (e) {
      const marker = L.marker(e.latlng).addTo(map);
      console.log(marker);
      marker
      .bindPopup(`FetchInfo`)
      .openPopup();
    });
  }, []);

  return null;
};
export default MyMarker;





