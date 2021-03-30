import React, { useState, useEffect } from 'react';

const Compass = ({bearing}) => {
  return (
    <div>
      <img src='../../public/full_compass.png'
      style={{
        position: 'absolute',
        zIndex: '1',
        right: "30%",
      }} />
      <img src='../../public/circle_compass.png'
      style={{
        position: 'absolute',
        zIndex: '2',
        right: "34.5%",
        top: '49.75%',
        transform: `rotate(${bearing}deg)`,

      }}
       />
    </div>
  )
}

export default Compass;