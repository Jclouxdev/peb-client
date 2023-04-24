import React, { useState } from 'react';
import Maped from '../Map/Map';

const initialData = [
  {
    id: 1,
    name: 'Tour Eiffel',
    description: 'La tour Eiffel est une tour de fer puddlé de 324 mètres de hauteur située à Paris, à l\'extrémité nord-ouest du parc du Champ-de-Mars en bordure de la Seine dans le 7ᵉ arrondissement.',
    lat: 48.8584,
    lng: 2.2945,
  },
  {
    id: 2,
    name: 'Arc de Triomphe',
    description: 'L\'Arc de triomphe de l\'Étoile est l\'une des plus célèbres places de Paris, située à l\'extrémité ouest de l\'avenue des Champs-Élysées.',
    lat: 48.8738,
    lng: 2.295,
  },
  {
    id: 3,
    name: 'Musée du Louvre',
    description: 'Le Musée du Louvre est un musée d\'art et d\'antiquités situé au centre de Paris.',
    lat: 48.8606,
    lng: 2.3376,
  },
];

function Acceuil() {
  const [data, setData] = useState(initialData);

  const handleMarkerAdd = (newMarker) => {
    setData((prevData) => [...prevData, newMarker]);
  };

  return (
    <div>
      <Maped data={data} onMarkerAdd={handleMarkerAdd} />
    </div>
  );
}

export default Acceuil;
