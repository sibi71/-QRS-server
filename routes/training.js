const router = require("express").Router()
const { training, course, student } = require("../model")

router.get('/training-schedules-list', async (req, res) => {
  try {
    const trainingSchedules = await training.find().populate('courseId');
    res.json(trainingSchedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/training-schedules-add", async (req, res) => {

  const { training_start, training_end, mycourse } = req.body;
  try {
    const trainingSchedule = await training.create({
      training_start: new Date(training_start),
      training_end: new Date(training_end),
      courseId: mycourse,
    })
   

    res.json({ trainingSchedule })
  } catch (error) {

  }
})


router.get('/:id', async (req, res) => {
  try {
    const trainingSchedule = await training.findById(req.params.id).populate("courseId");
    res.json(trainingSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { courseId, training_start, training_end } = req.body;
  try {
    
    const updatedSchedule = await training.findByIdAndUpdate(
      req.params.scheduleId,
      { courseId, training_start, training_end },
      { new: true } 
    );
    res.json(updatedSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTrainingSchedule = await training.findByIdAndDelete(req.params.id);
    res.json(deletedTrainingSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;