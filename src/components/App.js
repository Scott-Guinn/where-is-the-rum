import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login.js';
import Desires from './Desires.js';
import Compass from './Compass.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import styles from '../index.css';

const App = () => {
  const [userInfo, setUserInfo] = useState({ username: '', wantMost: 'rum' });
  const [desires, setDesires] = useState([]);
  const [position, setPosition] = useState({ lat: '', lng: '' });
  const [bearing, setBearing] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showDesires, setShowDesires] = useState(false);
  const [spin, setSpin] = useState(false);

  const getMyPosition = async () => {
    // check if browser supports Geolocation
    if (!navigator.geolocation) {
      console.error(`Your browser is preventing you from locating what you want most. Please enable location services.`);
      setSpin(true);
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

    await navigator.geolocation.getCurrentPosition(onSuccess, () => {
      console.log(`Failed to get your location!`);
      setSpin(true);
    });
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

  /* this function is buggy, removed for now */
  const toggleBearing = (bearing) => {
    console.log('toggleBearing has been called');
    setBearing(bearing + 30)
    setInterval(() => {
      setBearing(bearing - 15);
      setInterval(() => setBearing(bearing), 3000);
    }, 3000);
  }

  const getData = () => {
    if (position.lat !== '' && position.lng !== '') {
      console.log('GET request made to server');
      axios.post(`http://localhost:8000/`, { position: position, wantMost: userInfo.wantMost })
        .then(({ data }) => {
          console.log('bearing to destination: ', data.bearing);
          setBearing(data.bearing);
          setDesires(data.desires);
          console.log('desires: ', data.desires);
          // toggleBearing(data.bearing);
        }).catch((err) => {
          console.log('error in GET request to server: ', err);
          setSpin(true);
        })
    }
  }

  useEffect(() => {
    getMyPosition();
  }, []);

  useEffect(() => {
    getData();
  }, [userInfo, position])

  return (
    <div
      style={{
        backgroundImage: `url("./stained_bkg.jpg")`, backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        position: "relative",
        width: "max-content",
      }} >

      {showLogin ?
        <Login setUserInfo={setUserInfo} setShowLogin={setShowLogin} showLogin={showLogin} />
        : null
      }

      {showDesires ?
       <Desires setShowDesires={setShowDesires} showDesires={showDesires} desires={desires}
       />
       : null
      }

      <Compass bearing={bearing} spin={spin} />
      <div>
        <Button className="hiddenButton1" onClick={() => {
          setShowLogin(!showLogin);
          console.log('hidden button 1 clicked')
        }} />
        <Button className="hiddenButton2" onClick={() => {
          setShowDesires(!showDesires);
          console.log('hidden button 2 clicked')
        }} />
      </div>
    </div>
  )
}

export default App;