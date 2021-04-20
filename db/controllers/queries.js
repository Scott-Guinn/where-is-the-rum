const db = require('../index.js');
const axios = require('axios');
const API_KEY = process.env.API_KEY;
const User = require('../models/user.js');
const { calculateBearing } = require('../../helpers/calculateBearing.js');

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
  const {lat, lng} = req.body.position;
  var wantMost = req.body.wantMost;
  if (wantMost.length === 0) {
    wantMost = 'rum';
  }
  const query = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${API_KEY}&input="${wantMost}"&inputtype=textquery&fields=formatted_address,name,geometry&locationbias=point:${lat},${lng}`;

  console.log('query: ', query);
  console.log('Inputs from client:');
  console.log('api_key: ', API_KEY);
  console.log('wantMost: ', wantMost);
  console.log('lat: ', lat, 'lng: ', lng);
  axios.get(query)
    .then((response) => {
      console.log('data from GOOGLE: ', response.data.candidates[0]);
        const name = response.data.candidates[0].name;
        const bearing = calculateBearing(req.body.position, response.data.candidates[0].geometry.location);
        console.log('calculateBearing inputs:', req.body.position, response.data.candidates[0].geometry.location);

        User.find().limit(20).then((response) => {
          res.send({ bearing: bearing, desires: response, name: name });
        }).catch((err) => {
          console.log('err finding desires in db: ', err)
          res.send({ bearing: bearing, desires: [] });
        })

    }).catch((err) => {
      console.error('problem with GoogleAPI request: ', err);
    })
}

module.exports = {
  getNearest,
  addUser,
}