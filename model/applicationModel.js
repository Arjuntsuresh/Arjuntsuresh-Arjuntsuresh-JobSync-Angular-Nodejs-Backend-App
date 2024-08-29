const mongoose=require('mongoose');
const applicationSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        required:true
    },
    coverLetter:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('Application',applicationSchema);