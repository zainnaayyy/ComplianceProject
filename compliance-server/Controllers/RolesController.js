const Role = require('../Models/RolesModel');

exports.addRole = async (req, res) => {
  try {
    const { name } = req.body;
    const role = await Role.create({ name });
    res.status(201).json({ message: "Role saved successfully", success: true, role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const totalRecords = await Role.getTotalRecords();
    await Role.updateMany({},{ $set: { totalRecords } })
    const roles = await Role.find();
    res.status(200).json({ message: "Data fetched successfully", success: true, roles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const { id } = req.body;
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

exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.body;
    const role = await Role.findByIdAndDelete(id);
    const totalRecords = await Role.getTotalRecords();
    await Role.updateMany({},{ $set: { totalRecords } })
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json({ message: "Role deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.searchRole = async (req, res) => {
  try {
    const { name } = req.body;
    let filter = {};
    if (name) {
      filter.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }
    let roles = await Role.find(filter);
    if (!roles.length)
      return res.status(404).json({ message: "No site found!", success: false });
    const totalRecords = roles.length;
    await Role.updateMany({},{ $set: { totalRecords } })
    roles = await Role.find(filter);
    res.status(200).json({ message: "Data fetched successfully", success: true, roles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
