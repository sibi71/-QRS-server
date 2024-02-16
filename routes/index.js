const router = require("express").Router()
const course = require("./course")
const student = require("./student")
const training = require("./training")


router.use("/course",course)
router.use("/student",student)
router.use("/training",training)

module.exports=router