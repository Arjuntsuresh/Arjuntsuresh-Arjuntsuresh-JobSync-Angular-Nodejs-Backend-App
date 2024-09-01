const cloudinary = require('cloudinary').v2

const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET_KEY
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'JOBSYNC_JobApplications',
        allowedformats: [".doc",".docx",".pdf",]
    }
})

module.exports = {
    cloudinary,
    storage
}