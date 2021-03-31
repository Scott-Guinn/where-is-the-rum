const queries = require('../db/controllers/queries.js');

const express = require('express');
const cors = require('cors');
const path = require('path');
// const queries = require('../database/index.js');
const morgan = require('morgan')('dev');
const PORT = process.env.PORT || 8000;
const app = express();

app.use(morgan);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/', queries.getNearest);
app.post('/newUser', queries.addUser);

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});