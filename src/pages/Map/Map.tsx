import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L, { map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LeadletMyPosition from '../../components/Map/Marker/LocationMarker';
import MyMarker from '../../components/Map/Marker/AddMarker';
import { useState } from 'react';

const icon = new L.Icon({
  iconUrl: 'https://cdn4.iconfinder.com/data/icons/map-pins-2/256/19-512.png',
  iconSize: [30, 30],
});

const Maped = ({ data }) => {

  const styleMap = {
    width: 1200,
    height: 700,
    margin: 100,
  };


  return (
    <div>
      <MapContainer center={[44.85406584383385, -0.5661597118590191]} zoom={13} scrollWheelZoom={false} style={styleMap}>
        <TileLayer
          attribution='&amp;copy <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          {data.map((place) => (
            <Marker key={place.id} position={[place.lat, place.lng]} icon={icon}>
              <Popup>
                <h2>{place.name}</h2>
                <p>{place.description}</p>
              </Popup>
            </Marker>
          ))}
        <MyMarker />
        <LeadletMyPosition />
      </MapContainer>
    </div>
  );
};

export default Maped;

