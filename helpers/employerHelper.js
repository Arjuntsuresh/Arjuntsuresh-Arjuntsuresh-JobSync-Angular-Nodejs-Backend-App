const jobModel = require("../model/jobModel");


const addNewJob = async ({
  jobTitle,
  companyName,
  jobDescription,
  applicationDeadline,
  location
}) => {
  if (!jobTitle || !companyName || !jobDescription || !applicationDeadline || !location) {
    return false;
  }

  try {
    // Create a new job document
    const jobData = new jobModel({
      jobTitle,
      companyName,
      jobDescription,
      applicationDeadline,
      location
    });

    // Save the job document and return the result
    const savedJob = await jobData.save();
    return savedJob; // Return the saved job data
  } catch (error) {
    console.error('Error adding new job:', error);
    throw error; // Re-throw the error to be handled by the route handler
  }
};



module.exports = {addNewJob};
