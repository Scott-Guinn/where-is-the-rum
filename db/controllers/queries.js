const db = require('../index.js');
const axios = require('axios');
const API_KEY = process.env.API_KEY;
const User = require('../models/user.js');
const { calculateBearing } = require('../../helpers/calculateBearing.js');
const { calculateDistance } = require('../../helpers/calculateDistance.js');

const addUser = (req, res) => {
  const newUser = new User({ username: req.body.username, wantMost: req.body.wantMost });

  newUser.save()
    .then((response) => {
      res.send(response);
    }).catch((err) => {
      console.error(err);
      res.status(500).send(err);
    })
}

const getNearest = (req, res) => {
  const { lat, lng } = req.body.position;
  var destination = req.body.wantMost;
  if (destination.length === 0) {
    destination = 'rum';
  }
  const query = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${API_KEY}&input="${destination}"&inputtype=textquery&fields=formatted_address,name,geometry&locationbias=point:${lat},${lng}`;

  axios.get(query)
    .then((response) => {
      const destinationLatLong = response.data.candidates[0].geometry.location;
      console.log('response from GOOGLE API: ', response.data);
      const name = response.data.candidates[0].name;
      const bearing = calculateBearing(req.body.position, destinationLatLong);
      const distance = calculateDistance(req.body.position, destinationLatLong);

      res.send({ bearing: bearing, name: name, distance: distance });
    }).catch((err) => {
      console.error('problem with GoogleAPI request: ', err);
      res.send(err);
    })
}

// this function has not been fully implemented yet in web or mobile version.
// saving this code from previous demo for future implementation
const getDesires = () => {
  User.find().limit(20).then((response) => {
    res.send({ bearing: bearing, desires: response, name: name, distance: distance });
  }).catch((err) => {
    console.log('err finding desires in db: ', err)
    res.send({ bearing: bearing, desires: [], name: name, distance: distance });
  })
}

module.exports = {
  getNearest,
  addUser,
}