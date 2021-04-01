const db = require('../index.js');
const axios = require('axios');
const localkey = require('../../config.js').API_KEY;
let API_KEY = process.env.API_KEY;
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
  console.log('localkey: ', localkey);
  const {lat, lng} = req.body.position;
  var wantMost = req.body.wantMost;
  if (wantMost.length === 0) {
    wantMost = 'rum';
  }
  const query = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${API_KEY || localkey}&input="${wantMost}"&inputtype=textquery&fields=formatted_address,name,geometry&locationbias=point:${lat},${lng}47.6918452,-122.2226413`;
  console.log('query: ', query);


  axios.get(query)
    .then((response) => {
      if (response.data.candidates.length === 0) {
        res.sendStatus(404);
      } else {

        const bearing = calculateBearing(req.body.position, response.data.candidates[0].geometry.location);

        res.send({ bearing: bearing });
      }
    }).catch((err) => {
      console.error('problem with GoogleAPI request: ', err);
    })
}

module.exports = {
  getNearest,
  addUser,
}