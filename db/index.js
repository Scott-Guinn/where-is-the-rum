const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI || 'mongodb://localhost/rum';

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('mongoose connected successfully');
});

module.exports = db;