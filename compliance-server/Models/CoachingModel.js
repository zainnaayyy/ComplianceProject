const mongoose = require('mongoose');

const coachingSchema = new mongoose.Schema({
  coachingDate: {
    type: String,
    required: [true, "Coaching Date is required"],
  },
  agent: {
    type: String,
    required: [true, "Agent is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  frequency: {
    type: String,
    required: [true, "Frequency is required"],
  },
  actionTaken: {
    type: String,
    required: [true, "Action Taken is required"],
  },
  exceptional: {
    type: String,
  },
  developmentNeeded: {
    type: String,
  },
  underPerformed: {
    type: String,
  },
  implementationPlan: {
    type: String,
    required: [true, "Implementation Plan is required"],
  },
  comments: {
    type: String,
    required: [true, "Comments are required"],
  },
  commitments: {
    type: String,
    required: [true, "Commitments are required"],
  },
  behaviorType: {
    type: String,
    required: [true, "Behavior Type is required"],
  },
  coachabilityLevel: {
    type: String,
    required: [true, "Coachability Level is required"],
  },
  employeeSatisfaction: {
    type: String,
    required: [true, "Employee Satisfaction is required"],
  },
  coachingStatus: {
    type: String,
    required: [true, "Coaching Status is required"],
  },
  metric: {
    type: String,
  },
  actualScore: {
    type: String,
  },
  targetGoal: {
    type: String,
  },
  goalDate: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  totalRecords: {
    type: Number,
  }
});

// Static method to get total number of records
coachingSchema.statics.getTotalRecords = async function () {
  return await this.countDocuments();
};

const CoachingTemplate = mongoose.model('Coaching', coachingSchema);

module.exports = CoachingTemplate;
