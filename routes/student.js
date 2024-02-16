const router = require("express").Router()
const { student, training, course } = require("../model")



router.get('/students-list', async (req, res) => {
    try {
        const students = await student.find().populate("course");
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/students-add', async (req, res) => {


    const { name, email, mycourse } = req.body;

    try {
        const newStudent = await student.create({
            name: name,
            email: email,
            course: mycourse,
        });
       const courses = await course.findByIdAndUpdate(
        req.body.course,
        {
                $push:{student:newStudent._id}
        },{ new: true }
       )

        res.status(201).json({ newStudent, courses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});
router.post('/:id/opt-in', async (req, res) => {
    try {
        const students = await student.findById(req.params.id);
        const { trainingScheduleId } = req.body;

        if (!students.optedInTrainingSessions.includes(trainingScheduleId)) {
            students.optedInTrainingSessions.push(trainingScheduleId);
            await students.save();
        }

        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/:id/opt-out', async (req, res) => {
    try {
        const students = await student.findById(req.params.id);
        const { trainingScheduleId } = req.body;

        students.optedInTrainingSessions = students.optedInTrainingSessions.filter(
            (id) => id.toString() !== trainingScheduleId
        );

        await students.save();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const students = await student.findById(req.params.id).populate("course");
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { 
            name: name,
            email: email,
            course: mycourse, } = req.body;
        const updatedStudent = await student.findByIdAndUpdate(req.params.id, {
            name: name,
            email: email,
            course: mycourse,
        }, { new: true })
        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedStudent = await student.findByIdAndDelete(req.params.id);
        res.json(deletedStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;