import "../styling/PlacesList.css";

import {
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";

export default function PlacesList({ places, setMarkerCoords }) {
  return (
    <Card variant="outlined">
      <List className="list">
        {places.map((place) => (
          <ListItem
            key={place.place_id}
            button
            onClick={() => {
              setMarkerCoords(place.geometry.location);
            }}
          >
            <ListItemText primary={place.name} secondary={place.vicinity} />
            <ListItemAvatar variant="rounded">{place.rating}</ListItemAvatar>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
