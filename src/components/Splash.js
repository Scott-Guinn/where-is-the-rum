import React from 'react';
import Fade from 'react-bootstrap/Fade'

const Splash = () => {
  return (
    <div style={{ display: "flex", height: "100vh", alignItems: "center" }}>
      {/* <Fade in={true} appear={true} timeout="3000" unmountOnExit={true} > */}
        <div className="pirateText fadeInFast" style={{ display: "flex" }}> <h3>"How can we sail to an island that nobody can find,<br />with a compass that doesn't work?" </h3></div>
      {/* </Fade> */}
    </div>
  )
}

export default Splash;