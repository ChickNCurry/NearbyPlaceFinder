import './App.css';
import LocationSearch from './components/LocationSearch';
import PlaceFinder from './components/PlaceFinder';
import PlacesList from './components/PlacesList';
import { useState } from 'react';
import Map from './components/Map';

function App() {
  const [coords, setCoords] = useState({
    lat: null,
    lng: null,
  });
  const [markerCoords, setMarkerCoords] = useState({
    lat: null,
    lng: null,
  });
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [radius, setRadius] = useState();
  const [places, setPlaces] = useState([]);
  return (
    <div className='wrapper'>
      <div className='ui'>
        <LocationSearch
          address={address}
          setAddress={setAddress}
          coords={coords}
          setCoords={setCoords}
        />
        <PlaceFinder
          category={category}
          setCategory={setCategory}
          radius={radius}
          setRadius={setRadius}
          coords={coords}
          setPlaces={setPlaces}
        />
        <PlacesList
          places={places}
          setMarkerCoords={setMarkerCoords}
          markerCoords={markerCoords}
        />
      </div>
      <div className='map'>
        <Map coords={coords} markerCoords={markerCoords} />
      </div>
    </div>
  );
}

export default App;
