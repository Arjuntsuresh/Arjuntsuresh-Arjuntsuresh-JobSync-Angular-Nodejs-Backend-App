require("dotenv").config();
const mongoose = require("mongoose");
const URL = process.env.MONGO_URL;
const connectToDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("MongoDB Connected.");
  } catch (error) {
    console.error("Error connecting to Mongoose", error);
  }
};
module.exports = {
  connectToDB
};
