require("dotenv").config();
const express = require("express");
const employerRoute = express.Router();
const jobsModel = require("../model/jobModel");
const employerHelper = require("../helpers/employerHelper");

employerRoute.post('/upload-job',async (req,res)=>{
    try {
        const status=await employerHelper.addNewJob(req.body); 
        if(!status){
            throw new Error("couldn't add new job");
        }
        res.json({
            status:"success",
            message:"Job added successfully"
        })
    } catch (error) {
        res.status(500).send (error.message);
    }
})
module.exports = employerRoute