const CoachingLookup = require("../Models/CoachingLookupsModel");

/**
 * Controller to add new unique elements to arrays in an existing CoachingLookup document.
 */
exports.addCoachingLookup = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      category,
      frequency,
      actionTaken,
      metric,
      behaviorType,
      coachabilityLevel,
      employeeSatisfaction,
      coachingStatus,
    } = req.body;

    // Find the existing CoachingLookup document
    let coachingLookup = await CoachingLookup.findOne(); // Assuming there's only one document, or adjust the query

    if (!coachingLookup) {
      coachingLookup = new CoachingLookup();
    }

    // Function to check if an object with the same id or name exists in an array
    const addUniqueToArray = (array, newItems) => {
      newItems.forEach((item) => {
        const exists = array.some(
          (existingItem) =>
            existingItem.id.toString() === item.id ||
            existingItem.name.toLowerCase() === item.name.toLowerCase()
        );
        if (!exists) {
          array.push(item);
        } else {
          return res.status(409).json({
            success: false,
            message: "Record with same name already exists!",
          });
        }
      });
    };

    // Add unique elements to the respective arrays if provided
    if (category) {
      addUniqueToArray(coachingLookup.category, category);
    }
    if (frequency) {
      addUniqueToArray(coachingLookup.frequency, frequency);
    }
    if (actionTaken) {
      addUniqueToArray(coachingLookup.actionTaken, actionTaken);
    }
    if (metric) {
      addUniqueToArray(coachingLookup.metric, metric);
    }
    if (behaviorType) {
      addUniqueToArray(coachingLookup.behaviorType, behaviorType);
    }
    if (coachabilityLevel) {
      addUniqueToArray(coachingLookup.coachabilityLevel, coachabilityLevel);
    }
    if (employeeSatisfaction) {
      addUniqueToArray(
        coachingLookup.employeeSatisfaction,
        employeeSatisfaction
      );
    }
    if (coachingStatus) {
      addUniqueToArray(coachingLookup.coachingStatus, coachingStatus);
    }

    // Save the updated document
    await coachingLookup.save();

    // Send success response
    res.status(200).json({
      success: true,
      message: "CoachingLookup record updated successfully",
      coachingLookup,
    });
  } catch (error) {
    console.error("Error updating CoachingLookup:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the CoachingLookup record",
      error: error.message,
    });
  }
};

// Get all Coaching Lookup records
exports.getCoachingLookups = async (req, res) => {
  try {
    const coachingLookups = await CoachingLookup.find();
    res
      .status(200)
      .json({
        message: "Data fetched successfully",
        success: true,
        coachingLookups,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteCoachingLookupElement = async (req, res) => {
  try {
    // Extract the id and the array name from the request body
    const { id, arrayName } = req.body;

    if (!id || !arrayName) {
      return res.status(400).json({
        success: false,
        message: "Both id and arrayName are required",
      });
    }

    // Find the existing CoachingLookup document
    let coachingLookup = await CoachingLookup.findOne(); // Assuming there's only one document, or adjust the query

    if (!coachingLookup) {
      return res.status(404).json({
        success: false,
        message: "CoachingLookup document not found",
      });
    }

    // Check if the specified array exists in the document
    if (!coachingLookup[arrayName]) {
      return res.status(400).json({
        success: false,
        message: `Array "${arrayName}" does not exist in the CoachingLookup document`,
      });
    }

    // Find the index of the element with the specified id in the array
    const index = coachingLookup[arrayName].findIndex(
      (item) => item.id.toString() === id
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Element with id "${id}" not found in the array "${arrayName}"`,
      });
    }

    // Remove the element from the array
    coachingLookup[arrayName].splice(index, 1);

    // Save the updated document
    await coachingLookup.save();

    // Send success response
    res.status(200).json({
      success: true,
      message: `Element with id "${id}" removed from array "${arrayName}" successfully`,
      coachingLookup,
    });
  } catch (error) {
    console.error("Error deleting element from CoachingLookup:", error);
    res.status(500).json({
      success: false,
      message:
        "An error occurred while deleting the element from the CoachingLookup record",
      error: error.message,
    });
  }
};
