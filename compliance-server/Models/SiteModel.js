const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  totalRecords: { type: Number }
});

// Static method to get total number of records
siteSchema.statics.getTotalRecords = async function () {
  return await this.countDocuments();
};

module.exports = mongoose.model('Site', siteSchema);
