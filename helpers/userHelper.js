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
  name,
  email,
  phoneNumber,
  resume,
  coverLetter,
}) => {
  if (!name || !email || !phoneNumber || !resume || !coverLetter) {
    return false;
  }
  const resumeUrl = "http://localhost:3000/resume/uploads/" + resume;
  return applicationData = new applicationModel({
    name,
    email: email.toLowerCase(),
    phoneNumber,
    resume: resumeUrl,
    coverLetter,
  }).save();
};

// const resumeUpload=async (id,resume) =>{
//     if(!id || !resume){
//         return false;
//     }else{
//         return await applicationModel.updateOne(
//             {_id:new mongoose.Types.ObjectId(id)},
//             {
//                 $set:{
//                     resume:'http://localhost:3000/images/uploads/'+resume
//                 }
//             }
//         )
//     }
// }

module.exports = {
  getAllJobs,
  getJobById,
  saveApplication,
  // resumeUpload
};
