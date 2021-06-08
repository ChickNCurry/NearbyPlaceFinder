import '../styling/LocationSearch.css';
import { Card, Typography, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function LocationSearch(props) {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (inputValue !== '') {
      const URL =
        '/place/autocomplete/json?key=AIzaSyCYR2keF-c6-A0Js1Z9plAMfrQ004E-kfI&input=' +
        inputValue;
      axios
        .get(URL)
        .then(res => {
          setData(res.data.predictions);
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  }, [inputValue]);

  const setLocation = val => {
    if (val !== null) {
      props.setAddress(val.description);
      const URL =
        '/place/details/json?key=AIzaSyCYR2keF-c6-A0Js1Z9plAMfrQ004E-kfI&placeid=' +
        val.place_id;
      axios
        .get(URL)
        .then(res => {
          props.setCoords(res.data.result.geometry.location);
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  };

  return (
    <Card variant='outlined'>
      <div className='top'>
        <div>
          <Typography>Address: {props.address}</Typography>
        </div>
        <div>
          <Typography>Latitude: {props.coords.lat}</Typography>
        </div>
        <div>
          <Typography>Longtitude: {props.coords.lng}</Typography>
        </div>
        <div className='input'>
          <Autocomplete
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            onChange={(event, newValue) => {
              setLocation(newValue);
            }}
            options={data}
            getOptionLabel={option => option.description}
            getOptionSelected={(option, value) =>
              option.description === value.description
            }
            renderInput={params => (
              <TextField {...params} label='Address' variant='outlined' />
            )}
          />
        </div>
      </div>
    </Card>
  );
}

export default LocationSearch;
