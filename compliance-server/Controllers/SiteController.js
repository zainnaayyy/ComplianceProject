const Site = require('../Models/SiteModel');

exports.addSite = async (req, res) => {
  try {
    const { name } = req.body;
    const site = await Site.create({ name });
    res.status(201).json({ message: "Site save successfully", success: true, site });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getSites = async (req, res) => {
  try {
    const totalRecords = await Site.getTotalRecords();
    await Site.updateMany({},{ $set: { totalRecords } })
    const sites = await Site.find();
    res.status(201).json({ message: "Data fetched successfully", success: true, sites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getSiteById = async (req, res) => {
  try {
    const { id } = req.params;
    const site = await Site.findById(id);
    if (!site) {
      return res.status(404).json({ message: "Site not found" });
    }
    res.status(200).json({ message: "Data fetched successfully", success: true, site });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteSite = async (req, res) => {
  try {
    const { id } = req.params;
    const site = await Site.findByIdAndDelete(id);
    if (!site) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json({ message: "Role deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.searchSite = async (req, res) => {
  try {
    const { name } = req.query;
    let filter = {};
    if (name) {
      filter.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }
    const sites = await Site.find(filter);
    if (!sites.length)
      return res.status(404).json({ message: "No site found!", success: false });
    res.status(200).json({ message: "Data fetched successfully", success: true, sites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
