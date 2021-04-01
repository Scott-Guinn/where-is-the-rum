import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import axios from 'axios';

const Desires = ({ setShowDesires, showDesires, desires }) => {

  return (
    <>
      <Modal
        size="sm"
        show={showDesires}
        onHide={() => setShowDesires(false)}
        onExited={() => setShowDesires(false)}
        aria-labelledby="show-desires"
      >
        <Modal.Header closeButton>
          <Modal.Title id="show-desires">
            You're not alone...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {desires.length > 0 ? desires.map((desire) => (
            <div key={desire._id}>
              <div><strong>{`${desire.username || 'anonymous'}`}</strong> wants <strong>{`${desire.wantMost}`}</strong></div>
            </div>
          )) : null}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Desires;