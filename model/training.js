const mongoose = require("mongoose")

const TrainingSchema = new mongoose.Schema({
    courseId:[
        {
        type: mongoose.Types.ObjectId, ref: 'courses'
        }
    ],
    training_start:Date,
    training_end:Date,
},{timestamps:true})

const training = mongoose.model('trainings',TrainingSchema) ;

module.exports = training;