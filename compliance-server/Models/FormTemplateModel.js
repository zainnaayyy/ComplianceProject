const mongoose = require('mongoose');

const formTemplateSchema = new mongoose.Schema({
  form: {
    type: String,
    required: [true, "Form is required"],
    unique: true,
  },
  lob: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LOB', required: true }],
  flags: [{
    type: String,
    required: [true, "Flag is required"],
  }],
  group: [{
    type: String,
    required: [true, "Value is required"],
  }],
  questions: [{
    type: Object,
    required: [true, "Question is required"],
  }],
  MCQs: [{
    type: Object,
    required: [true, "MCQ is required"],
  }],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  totalRecords: {
    type: Number,
  }
});

// Static method to get total number of records
formTemplateSchema.statics.getTotalRecords = async function () {
  return await this.countDocuments();
};

const FormTemplate = mongoose.model('Form', formTemplateSchema);

module.exports = FormTemplate;
