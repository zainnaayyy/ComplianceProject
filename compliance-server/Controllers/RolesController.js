const Role = require('../Models/RolesModel');

exports.addRole = async (req, res) => {
  try {
    const { name, title } = req.body;
    const role = await Role.create({ name, title });
    res.status(201).json({ message: "Role saved successfully", success: true, role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json({ message: "Data fetched successfully", success: true, roles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json({ message: "Data fetched successfully", success: true, role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title } = req.body;
    const role = await Role.findByIdAndUpdate(id, { name, title }, { new: true, runValidators: true });
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json({ message: "Role updated successfully", success: true, role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByIdAndDelete(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json({ message: "Role deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
