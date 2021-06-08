import '../styling/PlacesList.css';
import {
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';

function PlacesList(props) {
  const listItems = props.places.map(place => (
    <ListItem
      key={place.place_id}
      button
      onClick={() => {
        props.setMarkerCoords(place.geometry.location);
      }}
    >
      <ListItemText primary={place.name} secondary={place.vicinity} />
      <ListItemAvatar variant='rounded'>{place.rating}</ListItemAvatar>
    </ListItem>
  ));
  return (
    <Card variant='outlined'>
      <List className='list'>{listItems}</List>
    </Card>
  );
}

export default PlacesList;
