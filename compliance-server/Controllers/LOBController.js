const LOB = require('../Models/LOBModel');

// Add a new LOB
exports.addLOB = async (req, res) => {
  try {
    const { name } = req.body;
    const lob = await LOB.create({ name });
    res.status(201).json({ message: "LOB saved successfully", success: true, lob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all LOBs
exports.getLOBs = async (req, res) => {
  try {
    const totalRecords = await LOB.getTotalRecords();
    await LOB.updateMany({},{ $set: { totalRecords } })
    const lobs = await LOB.find();
    res.status(201).json({ message: "Data fetched successfully", success: true, lobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get LOB by ID
exports.getLOBById = async (req, res) => {
  try {
    const { id } = req.body;
    const lob = await LOB.findById(id);
    if (!lob) {
      return res.status(404).json({ message: "Line of Business not found" });
    }
    res.status(200).json({ message: "Data fetched successfully", success: true, lob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a LOB
exports.deleteLOB = async (req, res) => {
  try {
    const { id } = req.body;
    const lob = await LOB.findByIdAndDelete(id);
    if (!lob) {
      return res.status(404).json({ message: "LOB not found" });
    }
    res.status(200).json({ message: "Line of Business deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Search LOBs
exports.searchLOBs = async (req, res) => {
  try {
    const { name } = req.body;
    let filter = {};
    if (name) {
      filter.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }
    let lobs = await LOB.find(filter);
    if (!lobs.length)
      return res.status(404).json({ message: "No line of business found!", success: false });
    const totalRecords = lobs.length;
    await LOB.updateMany({},{ $set: { totalRecords } })
    lobs = await LOB.find(filter);
    res.status(200).json({ message: "Data fetched successfully", success: true, lobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
