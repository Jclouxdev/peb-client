import React, { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

export function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      dblclick() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        console.log(position);
        
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
}
