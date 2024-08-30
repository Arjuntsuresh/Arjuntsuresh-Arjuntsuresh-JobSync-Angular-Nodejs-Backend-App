require("dotenv").config();
const express = require("express");
const userRoute = express.Router();
const jobsModel = require("../model/jobModel");
const userHelper = require("../helpers/userHelper");
const multer = require("multer");
const userModel = require("../model/userModel");
const { OAuth2Client } = require("google-auth-library");

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
    let id = req.params;

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

userRoute.post(
  "/submit-application",
  upload.single("resume"),
  async (req, res) => {
    try {
      const {
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
        coverLetter,
      } = req.body;

      // Get the resume file name from req.file
      const resume = req.file ? req.file.filename : null;

      if (!resume) {
        throw new Error("Resume file is required");
      }

      const status = await userHelper.saveApplication({
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
      });

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
  }
);

userRoute.post("/signup", async (req, res) => {
  try {
    const { userName, email, mobile, password } = req.body;
    if (!userName || !email || !mobile || !password) {
      //401 unauthorized user
      return res
        .status(401)
        .json({ status: "error", message: "Password Does not match" });
    }
    const findUser = await userHelper.checkUser(email);
    if (!findUser) {
      const hash = await userHelper.encryptPassword(password);
      const userData = new userModel({
        userName,
        mobile,
        email,
        password: hash,
      });
      await userData.save();
      //200 ok success
      reuturnData = {
        email: userData.email,
        mobile: userData.mobile,
        userName: userData.userName,
        _id: userData._id,
      };
      res.status(200).json(reuturnData);
    } else {
      // 409 Conflict user already exists.
      res.status(409).json({ status: "error", message: "User already exist" });
    }
  } catch (error) {
    // 500 internal server error.
    res.status(500).json({ status: "error", message: error.message });
  }
});

userRoute.post("/login", async (req, res) => {
  try {
    if (req.body.credential) {
      const userDeatils = await userHelper.verifyToken(req.body.credential);
      if (!userDeatils) {
        throw new Error("Invalid token");
      }
      const user = await userHelper.checkUser(userDeatils.email);
      if (user) {
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        const token = await userHelper.generateToken(jwtSecretKey, user._id);
        if (!token) {
          throw new Error("token is not found");
        }
        return res.status(200).json({ status: "success", user, token });
      }
    } else {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("insufficient data");
      }
      const response = await userHelper.checkUserFromDb(email, password);
      if (response) {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;

        const token = await userHelper.generateToken(
          jwtSecretKey,
          response._id
        );
        if (!token) {
          throw new Error("token is not found");
        }
        res.status(200).json({ status: "success", response, token });
      } else {
        throw new Error("invalid credentials");
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
});
module.exports = userRoute;
