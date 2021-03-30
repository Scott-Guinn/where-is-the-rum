import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [position, setPosition] = useState({ lat: '', lng: '' })

  const getMyPosition = async () => {
    // check if browser supports Geolocation
    if (!navigator.geolocation) {
      console.error(`Your browser is preventing you from locating what you want most. Please enable location services.`);
    }

    // handle success case
    function onSuccess(position) {
      const {
        latitude,
        longitude
      } = position.coords;

      setPosition({ lat: latitude, lng: longitude });
      console.log(`Your location: (${latitude},${longitude})`);
    }

    await navigator.geolocation.getCurrentPosition(onSuccess, () => console.log(`Failed to get your location!`));
  }

  const getNearestBar = (myLocation) => {
    if (myLocation.lat !== '' && myLocation.lng !== '') {
      console.log('GET request made to server');
      axios.post(`http://localhost:8000/`, myLocation)
      .then(({data}) => {
        console.log('response: ', data);
      })
    }
  }

  useEffect(() => {
    getMyPosition();
  }, []);

  useEffect(() => {
    getNearestBar(position);
  }, [position])

  return (
    <div>
      {console.log('current position: ', position)}
      Where is the rum? Ah here it is
    </div>
  )
}

export default App;