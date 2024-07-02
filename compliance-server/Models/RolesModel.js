const mongoose = require('mongoose');

const rolesSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  title: { type: String, unique: true, required: true },
});

const Role = mongoose.model('Roles', rolesSchema);

module.exports = Role;