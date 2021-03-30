const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rum', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('mongoose connected successfully');
});

module.exports = db;