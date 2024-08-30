const jobsModel = require("../model/jobModel");
const applicationModel = require("../model/applicationModel");
const mongoose = require("mongoose");

const getAllJobs = async (title, location) => {
  
  let query = {};

  if (title) {
    query.jobTitle = { $regex: new RegExp(title, 'i') };
  }
  
  if (location) {
    query.location = { $regex: new RegExp(location, 'i') }; 
  }
  return await jobsModel.find(query);
};


const getJobById = async (id) => {
  id = new mongoose.Types.ObjectId(id);
  return await jobsModel.findById({ _id: id });
};

const saveApplication = async ({
  jobId,
  firstName,
  lastName,
  citizenship,
  dateOfBirth,
  address,
  zipCode,
  city,
  phoneNumber,
  email,
  resume,
  coverLetter,
}) => {
  // Check if all required fields are provided
  if (
    !jobId ||
    !firstName ||
    !lastName ||
    !citizenship ||
    !dateOfBirth ||
    !address ||
    !zipCode ||
    !city ||
    !phoneNumber ||
    !email ||
    !resume ||
    !coverLetter
  ) {
    return false;
  }
  
  // Construct the resume URL
  const resumeUrl = `http://localhost:3000/resume/uploads/${resume}`;

  // Create and save the application data
  const applicationData = new applicationModel({
    jobId,
    firstName,
    lastName,
    citizenship,
    dateOfBirth,
    address,
    zipCode,
    city,
    phoneNumber,
    email: email.toLowerCase(),
    resume: resumeUrl,
    coverLetter,
  });

  return applicationData.save();
};



module.exports = {
  getAllJobs,
  getJobById,
  saveApplication,
};
