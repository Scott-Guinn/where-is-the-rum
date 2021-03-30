import React, { useState, useEffect } from 'react';

const Compass = ({ bearing }) => {
  return (
    <div style={{position: 'relative'}}>
      <img src='../../public/new_compass.png'
        style={{
          position: 'relative',
          zIndex: '1',
        }}/>
        <img src='../../public/circle_compass.png'
          style={{
            position: 'absolute',
            zIndex: '2',
            right: "12%",
            top: '53%',
            transition: 'transform 4s',
            transform: `rotate(${bearing}deg)`,

          }}
        />
    </div>
  )
}

export default Compass;