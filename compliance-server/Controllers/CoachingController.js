const { default: mongoose } = require("mongoose");
const CoachingTemplate = require("../Models/CoachingModel");

// Add Coaching controller
module.exports.AddCoaching = async (req, res, next) => {
  try {
    const {
      coachingDate,
      agent,
      category,
      frequency,
      actionTaken,
      exceptional,
      developmentNeeded,
      underPerformed,
      implementationPlan,
      comments,
      commitments,
      behaviorType,
      coachabilityLevel,
      employeeSatisfaction,
      coachingStatus,
      metric,
      actualScore,
      targetGoal,
      goalDate,
      createdAt,
    } = req.body;

    if (
      !coachingDate ||
      !agent ||
      !category ||
      !frequency ||
      !actionTaken ||
      !implementationPlan ||
      !comments ||
      !commitments ||
      !behaviorType ||
      !coachabilityLevel ||
      !employeeSatisfaction ||
      !coachingStatus
    ) {
      return res.status(403).json({ message: "All fields are required" });
    }

    // Create the coaching
    const Coaching = await CoachingTemplate.create({
      coachingDate,
      agent,
      category,
      frequency,
      actionTaken,
      exceptional,
      developmentNeeded,
      underPerformed,
      implementationPlan,
      comments,
      commitments,
      behaviorType,
      coachabilityLevel,
      employeeSatisfaction,
      coachingStatus,
      metric,
      actualScore,
      targetGoal,
      goalDate,
      createdAt: createdAt || new Date(),
    });

    // Save the coaching
    await Coaching.save();

    // Respond with success message
    res
      .status(201)
      .json({ message: "Coaching created successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all Coaching controller
module.exports.getAllCoachings = async (req, res) => {
  try {
    const totalRecords = await CoachingTemplate.getTotalRecords();
    await CoachingTemplate.updateMany({}, { $set: { totalRecords } });
    const coaching = await CoachingTemplate.find();
    res
      .status(200)
      .json({
        message: "Coaching fetched successfully",
        success: true,
        coaching,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Edit Coaching controller
module.exports.editCoaching = async (req, res) => {
  try {
    const {
      _id,
      coachingDate,
      agent,
      category,
      frequency,
      actionTaken,
      exceptional,
      developmentNeeded,
      underPerformed,
      implementationPlan,
      comments,
      commitments,
      behaviorType,
      coachabilityLevel,
      employeeSatisfaction,
      coachingStatus,
      metric,
      actualScore,
      targetGoal,
      goalDate,
    } = req.body;

    // Update Coaching
    const updatedCoaching = await CoachingTemplate.findByIdAndUpdate(
      _id,
      {
        coachingDate,
        agent,
        category,
        frequency,
        actionTaken,
        exceptional,
        developmentNeeded,
        underPerformed,
        implementationPlan,
        comments,
        commitments,
        behaviorType,
        coachabilityLevel,
        employeeSatisfaction,
        coachingStatus,
        metric,
        actualScore,
        targetGoal,
        goalDate,
      },
      { new: true }
    );

    if (!updatedCoaching) {
      return res
        .status(404)
        .json({ message: "Coaching not found", success: false });
    }

    res
      .status(200)
      .json({
        message: "Coaching updated successfully",
        success: true,
        coaching: updatedCoaching,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Search Coaching controller
exports.searchCoaching = async (req, res) => {
  try {
    const { agent, startDate, endDate } = req.body;
    let filter = {};

    // Filter by agent array (case-insensitive)
    if (agent && agent.length > 0) {
      filter.agent = {
        $in: agent.map((id) => id),
      };
    }

    // Filter by date range
    if (startDate || endDate) {
      filter.coachingDate = {};
      if (startDate) {
        filter.coachingDate.$gte = startDate;
      }
      if (endDate) {
        filter.coachingDate.$lte = endDate;
      }
    }

    let coaching = await CoachingTemplate.find(filter);

    if (!coaching.length)
      return res
        .status(404)
        .json({ message: "No Coaching found!", success: false });

    const totalRecords = coaching.length;

    // Update totalRecords for all documents
    await CoachingTemplate.updateMany({}, { $set: { totalRecords } });

    coaching = await CoachingTemplate.find(filter);

    res
      .status(200)
      .json({ message: "Data fetched successfully", success: true, coaching });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete Coaching
exports.deleteCoaching = async (req, res) => {
  try {
    const { id } = req.body;
    const coaching = await CoachingTemplate.findByIdAndDelete(id);
    const totalRecords = await CoachingTemplate.getTotalRecords();
    await CoachingTemplate.updateMany({}, { $set: { totalRecords } });
    if (!coaching) {
      return res.status(404).json({ message: "Coaching not found" });
    }
    res
      .status(200)
      .json({ message: "Coaching deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
