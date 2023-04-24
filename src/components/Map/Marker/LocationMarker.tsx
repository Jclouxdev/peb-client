import { ActionIcon } from "@mantine/core";
import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { CurrentLocation } from "tabler-icons-react";
import LeafletControl from "../Control/ControlCLass";

interface LeafletMyPositionProps {}

const LeadletMyPosition: React.FC<LeafletMyPositionProps> = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const map = useMapEvents({
    locationfound(e) {
      map.flyTo(e.latlng, map.getZoom())
      setLoading(false)
    },
  })

  return (
    <LeafletControl position={"topright"}>
      <ActionIcon
        onClick={() => {
          setLoading(true);
          map.locate();
        }}
        loading={loading}
        variant={"transparent"}
      >
      <CurrentLocation style={{color: "black"}}/>
      </ActionIcon>
    </LeafletControl>
  );
};

export default LeadletMyPosition;