import axios from 'axios';
import '../styling/PlaceFinder.css';
import {
  Button,
  Select,
  Card,
  FormControl,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const api_key = process.env.REACT_APP_GOOGLE_API_KEY;

const types = [
  { id: 'amusement_park', name: 'Amusement Park' },
  { id: 'aquarium', name: 'Aquarium' },
  { id: 'art_gallery', name: 'Art Gallery' },
  { id: 'bowling_alley', name: 'Bowling Alley' },
  { id: 'casino', name: 'Casino' },
  { id: 'movie_rental', name: 'Movie Rental' },
  { id: 'movie_theater', name: 'Movie Theater' },
  { id: 'museum', name: 'Museum' },
  { id: 'night_club', name: 'Night Club' },
  { id: 'park', name: 'Park' },
  { id: 'shopping_mall', name: 'Shopping Mall' },
  { id: 'tourist_attraction', name: 'Tourist Attraction' },
  { id: 'zoo', name: 'Zoo' },
];

const listItems = types.map(type => (
  <MenuItem key={type.id} value={type.id}>
    {type.name}
  </MenuItem>
));

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 300,
  },
}));

function PlaceFinder(props) {
  const classes = useStyles();

  const findPlaces = () => {
    if (props.category === 'random') {
      let promises = [];
      types.forEach(type => {
        promises.push(findPlacesOfType(type.id));
      });
      Promise.all(promises).then(res => {
        let newPlaces = [];
        res.forEach(places => {
          newPlaces = newPlaces.concat(places);
        });
        let filtered = new Map();
        newPlaces.forEach(place => {
          filtered.set(place.place_id, place);
        });
        props.setPlaces(Array.from(filtered.values()));
      });
    } else {
      findPlacesOfType(props.category).then(res => {
        props.setPlaces(res);
      });
    }
  };

  const findPlacesOfType = type => {
    console.log(type);
    const URL = `/place/nearbysearch/json?location=${props.coords.lat},${props.coords.lng}&type=${type}&radius=${props.radius}&key=${api_key}`;
    return axios
      .get(URL)
      .then(res => res.data.results)
      .catch(err => {
        console.log(err.message);
      });
  };

  const handleCategory = event => {
    props.setCategory(event.target.value);
  };

  const handleRadius = event => {
    props.setRadius(event.target.value);
  };

  return (
    <Card variant='outlined'>
      <div className='middle'>
        <div>
          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={props.category || ''} onChange={handleCategory}>
              <MenuItem value='random'>Random</MenuItem>
              {listItems}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel>Radius</InputLabel>
            <Select value={props.radius || ''} onChange={handleRadius}>
              <MenuItem value={5000}>5km</MenuItem>
              <MenuItem value={10000}>10km</MenuItem>
              <MenuItem value={15000}>15km</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <Button variant='outlined' onClick={findPlaces}>
            Find close by
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default PlaceFinder;
