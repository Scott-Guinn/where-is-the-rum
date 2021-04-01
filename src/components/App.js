import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Splash from './Splash.js';
import Login from './Login.js';
import Desires from './Desires.js';
import Compass from './Compass.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import Fade from 'react-bootstrap/Fade'
import styles from '../index.css';

const App = () => {
  const [loading, setLoading] = useState(true);

  const [userInfo, setUserInfo] = useState({ username: '', wantMost: 'rum' });
  const [desires, setDesires] = useState([]);
  const [position, setPosition] = useState({ lat: '', lng: '' });
  const [bearing, setBearing] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showDesires, setShowDesires] = useState(false);
  const [spin, setSpin] = useState(false);

  const PORT = process.env.PORT || 8000;

  const backgroundImageStyle = {
    display: "flex",
    justifyContent: "center",
    position: "relative",
  }

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
      setLoading(false);
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
      axios.post(`http://localhost:${PORT}/`, { position: position, wantMost: userInfo.wantMost })
        .then(({ data }) => {
          console.log('Bearing to destination: ', data.bearing);
          setBearing(data.bearing);
          setDesires(data.desires);
          console.log('Data from server: ', data);
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

  if (loading) {
    return <Splash />
  }

  return (
    <div>

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

        <OverlayTrigger
          placement='left'
          overlay={
            <Tooltip id={`tooltip-login`}>
              "A compass that doesn't point North...
              But we're not trying to find North, are we?"
            </Tooltip>
          }
        >
          <Button className="hiddenButton1" onClick={() => {
            setShowLogin(!showLogin);
          }} />
        </OverlayTrigger>

        <OverlayTrigger
          placement='left'
          overlay={
            <Tooltip id={`tooltip-desires`}>
              "Not all treasure's silver and gold, mate.""
            </Tooltip>
          }
        >
          <Button className="hiddenButton2" onClick={() => {
            setShowDesires(!showDesires);
          }} />
        </OverlayTrigger>
      </div>
    </div>
  )
}

export default App;