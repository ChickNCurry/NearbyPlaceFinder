import "../styling/Map.css";

import { GoogleMap, withGoogleMap, Marker } from "react-google-maps";

const WrappedMap = withGoogleMap(({ coords, markerCoords }) => (
  <GoogleMap defaultZoom={15} center={coords}>
    <Marker position={markerCoords} />
  </GoogleMap>
));

export default function Map({ coords, markerCoords }) {
  return (
    <WrappedMap
      coords={coords}
      markerCoords={markerCoords}
      loadingElement={<div style={{ height: "100%" }} />}
      containerElement={<div style={{ height: "100%" }} />}
      mapElement={<div style={{ height: "100%" }} />}
    />
  );
}
