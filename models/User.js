
////YKSBEcXNbWytSFPV
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  gmail: { type: String, required: true },
  group: { type: String },
  notte: { type: String }
});

module.exports = mongoose.model('User', userSchema);
