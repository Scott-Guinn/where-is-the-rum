import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import axios from 'axios';

const Login = ({ setUserInfo, setShowLogin, showLogin }) => {
  const [name, setName] = useState('');
  const [wantMost, setWantMost] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSumbit called', name, wantMost);
    axios.post('http://localhost:8000/newUser', { username: name, wantMost: wantMost })
      .then((res) => {
        console.log('response from server: ', res);
        setUserInfo({ username: name, wantMost: wantMost });
      })
  }

  return (
    <>
      <Modal
        size="sm"
        show={showLogin}
        onHide={() => setShowLogin(false)}
        onExited={()=> setShowLogin(false)}
        aria-labelledby="enter-user-info"
      >
        <Modal.Header closeButton>
          <Modal.Title id="enter-user-info">
            Who goes there?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group controlId="inputName">
            <Form.Label>State your name:</Form.Label>
            <Form.Control type="text" placeholder="Captain Jack Sparrow" value={name} onChange={(e) => setName(e.target.value)}/>
          </Form.Group>
          <Form.Group controlId="inputWantMost">
            <Form.Label>And what is it that you're lookin' for?</Form.Label>
            <Form.Control type="text" placeholder="Rum" value={wantMost} onChange={(e) => setWantMost(e.target.value)}/>
          </Form.Group>


            {/* <label type="text" htmlFor="name">Who goes there?</label><br />
            <input type="text" value={name} placeholder="Captain Jack Sparrow" onChange={(e) => setName(e.target.value)} name="name" /><br />

            <label type="text" htmlFor="name">Ye think ya know better than this here compass? <br />Enter what you want most in this world below.</label><br />
            <input type="text" value={wantMost} placeholder="Rum" onChange={(e) => setWantMost(e.target.value)} name="name" /> */}

            <Button variant="secondary" onClick={(e) => handleSubmit(e)}>Enter</Button>

          </Form>
        </Modal.Body>
      </Modal>


    </>
  )
}

export default Login;