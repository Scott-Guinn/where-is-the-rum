const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  wantMost: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;