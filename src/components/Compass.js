import React, { useState, useEffect } from 'react';
import './compass.css';

const Compass = ({ bearing, spin }) => {
  var compassStyle;
  if (spin) {
    compassStyle = {
      animation: "spin 10s linear infinite"
    }
  } else {
    compassStyle = {
      transform: `rotate(${bearing}deg)`
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <img src='../../public/new_compass.png'
        style={{
          position: 'relative',
          zIndex: '1',
        }} />
      <img src='../../public/circle_compass.png'
        className="compass"
        style={compassStyle}
      />
    </div>
  )
}

export default Compass;