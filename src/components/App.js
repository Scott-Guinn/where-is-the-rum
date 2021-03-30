import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login.js';
import Compass from './Compass.js';
import styles from '../index.css';

const App = () => {
  const [userInfo, setUserInfo] = useState({username: '', wantMost: 'rum'});
  const [position, setPosition] = useState({ lat: '', lng: '' });
  const [bearing, setBearing] = useState(0);

  const getMyPosition = async () => {
    console.log('getMyPosition has been called');
      // check if browser supports Geolocation
      if (!navigator.geolocation) {
        console.error(`Your browser is preventing you from locating what you want most. Please enable location services.`);
      }

      // handle success case
      function onSuccess(position) {
        console.log('success!');
        const {
          latitude,
          longitude
        } = position.coords;

        setPosition({ lat: latitude, lng: longitude });
        console.log(`Your location: (${latitude},${longitude})`);
      }

      await navigator.geolocation.getCurrentPosition(onSuccess, () => console.log(`Failed to get your location!`));
  }

  // for future (mobile) implementation
  const getOrientation = () => {
    // FUTURE FEATURE
    if (!window.DeviceOrientationEvent) {
      console.log('Browser does not support device orientation');
      // go to bearing mode
    } else {
      console.log('browser allows DeviceOrientationEvent');
      window.addEventListener('deviceorientation', function (event) {
        var alpha = event.alpha;
        var beta = event.beta;
        var gamma = event.gamma;
        console.log('alpha, beta, gamma: ', alpha, beta, gamma)
      }, false);
    }

  }

  const getNearest = () => {
    if (position.lat !== '' && position.lng !== '') {
      console.log('GET request made to server');
      axios.post(`http://localhost:8000/`, {position: position, wantMost: userInfo.wantMost})
        .then(({ data }) => {
          console.log('response: ', data);
          setBearing(data.bearing);
        })
    }
  }

  useEffect(() => {
    getMyPosition();
  }, []);

  useEffect(() => {
    getNearest();
  }, [userInfo, position])

  return (
    <div style={{ display: "flex", justifyContent: "center"}} >
      {userInfo.username === '' ?
      <Login setUserInfo={setUserInfo}/> : null }
      <Compass bearing={bearing} />
    </div>
  )
}

export default App;