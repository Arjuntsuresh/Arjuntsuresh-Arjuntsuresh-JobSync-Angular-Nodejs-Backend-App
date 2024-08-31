const jobModel = require("../model/jobModel");
//This is the helper function that will be called when a job is created.
const addNewJob = async ({
  jobTitle,
  companyName,
  jobDescription,
  applicationDeadline,
  location,
}) => {
  if (
    !jobTitle ||
    !companyName ||
    !jobDescription ||
    !applicationDeadline ||
    !location
  ) {
    return false;
  }
  try {
    // Create a new job document
    const jobData = new jobModel({
      jobTitle,
      companyName,
      jobDescription,
      applicationDeadline,
      location,
    });
    // Save the job document and return the result
    const savedJob = await jobData.save();
    return savedJob;
  } catch (error) {
    console.error("Error adding new job:", error);
    throw error;
  }
};

module.exports = { addNewJob };
