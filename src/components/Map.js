import '../styling/Map.css';
import { GoogleMap, withGoogleMap, Marker } from 'react-google-maps';

const WrappedMap = withGoogleMap(props => (
  <GoogleMap defaultZoom={15} center={props.coords}>
    <Marker position={props.markerCoords} />
  </GoogleMap>
));

function Map(props) {
  return (
    <WrappedMap
      coords={props.coords}
      markerCoords={props.markerCoords}
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ height: '100%' }} />}
      mapElement={<div style={{ height: '100%' }} />}
    />
  );
}

export default Map;
