const mongoose = require("mongoose");

const CoachingLookupSchema = new mongoose.Schema({
  category: [
    {
      name: { type: String, required: [true, "Category name is required"] },
      categoryTotalRecords: { type: Number, default: 0 },
    },
  ],

  frequency: [
    {
      name: { type: String, required: [true, "Frequency name is required"] },
      frequencyTotalRecords: { type: Number, default: 0 },
    },
  ],

  actionTaken: [
    {
      name: { type: String, required: [true, "Action taken name is required"] },
      actionTakenTotalRecords: { type: Number, default: 0 },
    },
  ],

  metric: [
    {
      name: { type: String, required: [true, "Metric name is required"] },
      metricTotalRecords: { type: Number, default: 0 },
    },
  ],

  behaviorType: [
    {
      name: {
        type: String,
        required: [true, "Behavior type name is required"],
      },
      behaviorTypeTotalRecords: { type: Number, default: 0 },
    },
  ],

  coachabilityLevel: [
    {
      name: {
        type: String,
        required: [true, "Coachability level name is required"],
      },
      coachabilityLevelTotalRecords: { type: Number, default: 0 },
    },
  ],

  employeeSatisfaction: [
    {
      name: {
        type: String,
        required: [true, "Employee Satisfaction name is required"],
      },
      employeeSatisfactionTotalRecords: { type: Number, default: 0 },
    },
  ],

  coachingStatus: [
    {
      name: {
        type: String,
        required: [true, "Coaching Status name is required"],
      },
      coachingStatusTotalRecords: { type: Number, default: 0 },
    },
  ],
});

// Middleware to update totalRecords
CoachingLookupSchema.pre("save", function (next) {
  this.category.forEach((item) => {
    item.categoryTotalRecords = this.category.length;
  });

  this.frequency.forEach((item) => {
    item.frequencyTotalRecords = this.frequency.length;
  });

  this.actionTaken.forEach((item) => {
    item.actionTakenTotalRecords = this.actionTaken.length;
  });

  this.metric.forEach((item) => {
    item.metricTotalRecords = this.metric.length;
  });

  this.behaviorType.forEach((item) => {
    item.behaviorTypeTotalRecords = this.behaviorType.length;
  });

  this.coachabilityLevel.forEach((item) => {
    item.coachabilityLevelTotalRecords = this.coachabilityLevel.length;
  });

  this.employeeSatisfaction.forEach((item) => {
    item.employeeSatisfactionTotalRecords = this.employeeSatisfaction.length;
  });

  this.coachingStatus.forEach((item) => {
    item.coachingStatusTotalRecords = this.coachingStatus.length;
  });

  next();
});

// Middleware to update totalRecords after a document update
CoachingLookupSchema.post("findOneAndUpdate", async function (doc) {
  await doc.save();
});

const CoachingLookup = mongoose.model("CoachingLookup", CoachingLookupSchema);

module.exports = CoachingLookup;
