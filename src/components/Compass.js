import React, { useState, useEffect } from 'react';

const Compass = ({ bearing }) => {
  return (
    <div style={{position: 'relative'}}>
      <img src='../../public/full_compass.png'
        style={{
          position: 'relative',
          zIndex: '1',
        }}/>
        <img src='../../public/circle_compass.png'
          style={{
            position: 'absolute',
            zIndex: '2',
            right: "15%",
            top: '55%',
            transform: `rotate(${bearing}deg)`,

          }}
        />
    </div>
  )
}

export default Compass;