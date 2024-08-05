const FormTemplate = require("../Models/FormTemplateModel");
const LOB = require("../Models/LOBModel");
const mongoose = require('mongoose');

// Add Form controller
module.exports.AddForm = async (req, res, next) => {
  try {
    const { form, lob, flags, group, questions, MCQs, createdAt } = req.body;

    if (!form || !lob || !flags || !group || !questions || !MCQs) {
      return res.status(403).json({ message: 'All fields are required' });
    }

    // Check if the form already exists
    const existingName = await FormTemplate.findOne({ form });
    if (existingName) {
      return res.json({ message: "Form with same name already exists" });
    }

    // Ensure LOB IDs are valid ObjectIds
    if (!lob.every(id => mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ message: "Invalid Line of Business IDs" });
    }

    // Find LOB by IDs
    const lobs = await LOB.find({ _id: { $in: lob } });
    if (lobs.length !== lob.length) {
      return res.status(404).json({ message: "Some Line of Businesses not found" });
    }

    // Create the form
    const formTemplate = await FormTemplate.create({
      form,
      lob: lobs.map(lob => lob),
      flags,
      group,
      questions,
      MCQs,
      createdAt: createdAt || new Date(),
    });

    // Save the form
    await formTemplate.save();

    // Respond with success message
    res.status(201).json({ message: "Form created successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all Form Templates controller (excluding passwords)
module.exports.getAllFormTemplates = async (req, res) => {
  try {
    const totalRecords = await FormTemplate.getTotalRecords();
    await FormTemplate.updateMany({},{ $set: { totalRecords } })
    const formTemplates = await FormTemplate.find();
    res.status(200).json({ message: "Forms fetched successfully", success: true, formTemplates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Edit Form Template controller
module.exports.editFormTemplate = async (req, res) => {
  try {
    const { _id, form, lob, flags, group, questions, MCQs } = req.body;

    // Ensure LOB IDs are valid ObjectIds
    if (!lob.every(id => mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ message: "Invalid Line of Business IDs" });
    }

    // Find LOB by IDs
    const lobs = await LOB.find({ _id: { $in: lob } });
    if (lobs.length !== lob.length) {
      return res.status(404).json({ message: "Some Line of Businesses not found" });
    }

    // Update Form Template
    const updatedFormTemplate = await FormTemplate.findByIdAndUpdate(
      _id,
      {
        form,
        lob: lobs.map(lob => lob),
        flags,
        group,
        questions,
        MCQs,
      },
      { new: true }
    );

    if (!updatedFormTemplate) {
      return res.status(404).json({ message: "Form not found", success: false });
    }

    res.status(200).json({ message: "Form updated successfully", success: true, formTemplate: updatedFormTemplate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Search Form Template controller
exports.searchFormTemplate = async (req, res) => {
  try {
    const { form } = req.body;
    let filter = {};
    if (form) {
      filter.form = { $regex: form, $options: 'i' }; // Case-insensitive search
    }
    let formTemplates = await FormTemplate.find(filter);
    if (!formTemplates.length)
      return res.status(404).json({ message: "No Form found!", success: false });
    const totalRecords = formTemplates.length;
    await FormTemplate.updateMany({},{ $set: { totalRecords } })
    formTemplates = await FormTemplate.find(filter);
    res.status(200).json({ message: "Data fetched successfully", success: true, formTemplates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete Form Template
exports.deleteFormTemplate = async (req, res) => {
  try {
    const { id } = req.body;
    const formTemplate = await FormTemplate.findByIdAndDelete(id);
    const totalRecords = await FormTemplate.getTotalRecords();
    await FormTemplate.updateMany({},{ $set: { totalRecords } })
    if (!formTemplate) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json({ message: "Form deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};