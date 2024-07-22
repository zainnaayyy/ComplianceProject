const mongoose = require('mongoose');

const rolesSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  totalRecords: { type: Number }
});

// Static method to get total number of records
rolesSchema.statics.getTotalRecords = async function () {
  return await this.countDocuments();
};

const Role = mongoose.model('Roles', rolesSchema);

module.exports = Role;