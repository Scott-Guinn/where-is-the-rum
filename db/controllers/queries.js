const db = require('../index.js');
const axios = require('axios');
const { API_KEY } = require('../../config.js');
const User = require('../models/user.js');

const addUser = (req, res) => {
  const newUser = new User({ username: req.body.username });

  newUser.save()
  .then((response) => {
    res.send(response);
  }).catch((err) => {
    console.error(err);
    res.status(500).send(err);
  })
}

const getNearest = (req, res) => {
  console.log('getNearest has been called');

  axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${API_KEY}&input=bar&inputtype=textquery&fields=formatted_address,name,geometry`)
  .then((response) => {

  })

  res.send('successful');
}

module.exports = {
  getNearest,
  addUser,
}