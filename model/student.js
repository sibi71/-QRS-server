const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: String,
    email: String,
    course:[{ type: mongoose.Types.ObjectId, ref: 'courses' }],
    training: [{ type: mongoose.Types.ObjectId, ref: 'trainings' }],
}, { timestamps: true })


const student = mongoose.model("students", StudentSchema);

module.exports = student;