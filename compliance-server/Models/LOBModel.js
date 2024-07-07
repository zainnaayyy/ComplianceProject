const mongoose = require('mongoose');

const LOBSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
});

module.exports = mongoose.model('LOB', LOBSchema);