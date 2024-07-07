const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
});

module.exports = mongoose.model('Site', siteSchema);
