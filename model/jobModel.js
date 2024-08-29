const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  jobDiscription: {
    type: String,
    required: true,
  },
  applicationDeadline: {
    type: Date,
    required: true,
  },
  location:{
    type:String,
    required: true
  }

});
const jobModel = new mongoose.model("job", jobSchema);
module.exports = jobModel;
