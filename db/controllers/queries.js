const db = require('../index.js');
const axios = require('axios');
const { API_KEY } = require('../../config.js');
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
  console.log('req.body: ', req.body);
  console.log('what does user want most: ', req.body.wantMost);
  var wantMost = req.body.wantMost;
  if (wantMost.length === 0) {
    wantMost = 'rum';
  }
  const query = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${API_KEY}&input="${wantMost}"&inputtype=textquery&fields=formatted_address,name,geometry`;

  axios.get(query)
    .then((response) => {
      const bearing = calculateBearing(req.body.position, response.data.candidates[0].geometry.location);

      res.send({ bearing: bearing });
    })
}

module.exports = {
  getNearest,
  addUser,
}