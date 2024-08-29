    require("dotenv").config();
    const express = require("express");
    const userRoute = express.Router();
    const jobsModel = require("../model/jobModel");
    const userHelper = require("../helpers/userHelper");
    const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "views/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

userRoute.post("/jobs", async (req, res) => {
  try {
    const { title, location } = req.body;
    const jobs = await userHelper.getAllJobs(title, location);

    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "No jobs found" });
    }

    res.status(200).send(jobs);
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Error while retrieving jobs" });
      
  }
});

userRoute.get("/jobs/:id", async (req, res) => {
  try {
    let id  = req.params;
    
    if (!id) {
      throw new Error("Invalid job");
    }
    const job = await userHelper.getJobById(id);
    if (job.length < 1) {
      throw new Error("Job not found");
    }
    res.status(200).send(job);
  } catch (error) {
    return res
      .status(404)
      .json({ status: "error", message: "error while retrieving job details" });
  }
});

userRoute.post("/submit-application", async (req, res) => {
  try {
    const status = await userHelper.saveApplication(req.body);
    if (!status) {
      throw new Error("Failed to submit application");
    }
    res.json({
      status: "success",
      message: "Application successfully submitted",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
module.exports = userRoute
