const jobsModel = require("../model/jobModel");
const applicationModel = require("../model/applicationModel");
const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
//This is the helper function that will be called when the user is searching for jobs.
const getAllJobs = async (title, location) => {
  let query = {};

  if (title) {
    query.jobTitle = { $regex: new RegExp(title, "i") };
  }

  if (location) {
    query.location = { $regex: new RegExp(location, "i") };
  }
  return await jobsModel.find(query);
};
//This is the helper function that will be called to retrieve the details of a job.
const getJobById = async (id) => {
  id = new mongoose.Types.ObjectId(id);
  return await jobsModel.findById({ _id: id });
};
//This is the helper function for saving user job application in database.
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
// This is the helper function for checking if the user is exist or not.
const checkUser = async (email) => {
  try {
    const data = await userModel.findOne({ email });
    if (data) {
      return data;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
};
//This is the helper function for encrypting the password in to hash.
const encryptPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};
//This is helper function for checking the user by email and password.
const checkUserFromDb = async (email, password) => {
  const data = await userModel.find({ email });
  const hashedPassword = data[0].password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
      if (err) {
        reject(err);
      }
      if (isMatch) {
        resolve({
          _id: data[0]._id,
          userName: data[0].userName,
          mobile: data[0].mobile,
          email: data[0].email,
        });
      } else {
        resolve(false);
      }
    });
  });
};
//This is the helper function for generation jwt token.
const generateToken = async (secret, id) => {
  if (!secret || !id) {
    return false;
  } else {
    const data = {
      time: new Date(),
      id,
    };
    try {
      return jwt.sign(data, secret); // return token
    } catch (error) {
      console.error("Error generating token:", error);
      throw error; // or handle error as needed
    }
  }
};
//This is the helper function for verifying token.
const verifyToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload; // This will contain the user's email and other info
};

module.exports = {
  getAllJobs,
  getJobById,
  saveApplication,
  checkUser,
  encryptPassword,
  checkUserFromDb,
  generateToken,
  verifyToken,
};
