const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
require("./config/database").connectToDB();
const cors = require("cors");
//middleware setup
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("/resume", express.static("views"));
//Routes
const userRoute = require("./routers/userRoutes");
const employerRoute = require("./routers/employerRouter");
//Path handlers
app.use("/", userRoute);
app.use("/employer", employerRoute);
// Start server on port
app.listen(PORT, () => {
  try {
    console.log(`Starting server on port ${PORT}`);
  } catch (error) {
    console.error(`Error starting server: ${error}`);
  }
});
