const mongoose = require("mongoose");
//This is the schema for the jobs that are created.
const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  applicationDeadline: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});
const jobModel = new mongoose.model("job", jobSchema);
module.exports = jobModel;
