import React, { useState, useEffect } from 'react';
import './compass.css';

const Compass = ({ bearing, spin }) => {
  var compassStyle;
  if (spin) {
    compassStyle = {
      animation: "spin 7s linear infinite"
    }
  } else {
    compassStyle = {
      transform: `rotate(${bearing}deg)`
    }
  }

  return (
    <div className="fadeIn" style={{ position: 'relative' }}>
        <img src='./new_compass.png'
          style={{
            position: 'relative',
            zIndex: '1',
          }} />
        <img src='./circle_compass.png'
          className="compass"
          style={compassStyle}
        />
    </div>
  )
}

export default Compass;