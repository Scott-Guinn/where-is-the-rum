import React, { useState, useEffect } from 'react';

const App = () => {
  const [position, setPosition] = useState({ lat: '', long: '' })

  const getMyPosition = async () => {

    if (!navigator.geolocation) {
      console.error(`Your browser doesn't support Geolocation`);
    }

    // handle success case
    function onSuccess(position) {
      const {
        latitude,
        longitude
      } = position.coords;

      setPosition({ lat: latitude, long: longitude });
      console.log(`Your location: (${latitude},${longitude})`);
    }

    // handle error case
    function onError() {
      console.log(`Failed to get your location!`);
    }
    await navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }

  useEffect(() => {
    getMyPosition();
  }, []);

  return (
    <div>
      {console.log('current position: ', position)}
      Where is the rum? Ah here it is
    </div>
  )
}

export default App;