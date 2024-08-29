const jobModel = require("../model/jobModel");


const addNewJob = async ({
  jobTitle,
  companyName,
  jobDiscription,
  applicationDeadline,
}) => {
  if (!jobTitle || !companyName || !jobDiscription || !applicationDeadline) {
    return false;
    //throw new Error("All fields are required");
  }
  return jobData = new jobModel({
    jobTitle,
    companyName,
    jobDiscription,
    applicationDeadline,
  }).save();
};

module.exports = {addNewJob};
