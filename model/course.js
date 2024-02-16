const mongoose = require("mongoose")

const CourseSchema = new mongoose.Schema({
    name: String,
    description: String,
    student:[
        {
             type: mongoose.Types.ObjectId, ref: 'students' 
        }
    ]
}, { timestamps: true })

const course = mongoose.model('courses', CourseSchema)

module.exports = course;