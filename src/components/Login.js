import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = ({setUserInfo}) => {
  const [name, setName] = useState('');
  const [wantMost, setWantMost] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSumbit called', name, wantMost);
    axios.post('http://localhost:8000/newUser', {username: name, wantMost: wantMost})
    .then((res) => {
      console.log('response from server: ', res);
      setUserInfo({username: name, wantMost: wantMost});
    })
  }

  return (
    <div style={{float: "left"}}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label type="text" htmlFor="name">Who goes there?</label><br/>
        <input type="text" value={name} placeholder="Captain Jack Sparrow" onChange={(e) => setName(e.target.value)}name="name"/><br/>

        <label type="text" htmlFor="name">Ye think ya know better than this here compass? Enter what you want most in this world below.</label><br/>
        <input type="text" value={wantMost} placeholder="Rum" onChange={(e) => setWantMost(e.target.value)} name="name"/>

        <button style={{width: "50px", height: "20px"}}title="Open" onClick={(e) => handleSubmit(e)} />

      </form>
    </div>
  )
}

export default Login;