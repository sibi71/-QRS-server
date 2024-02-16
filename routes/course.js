const router = require("express").Router()
const {course, training, student} = require("../model")

router.get("/",(req,res)=>{
    res.send("student route is working");
})


router.get('/course-list', async (req, res) => {
    try {
      const courses = await course.find().populate("student","name" );
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.post('/course-add', async (req, res) => {
    try {
      const { name, description } = req.body;
      const courses = new course({ name, description });
     
      const savedCourse = await courses.save();
      res.json(savedCourse);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const courses = await course.findById(req.params.id);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.put('/:id', async (req, res) => {
    try {
      const { name, description } = req.body;
      const updatedCourse = await course.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
      res.json(updatedCourse);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.delete('/:id', async (req, res) => {
    try {
      const deletedCourse = await course.findByIdAndDelete(req.params.id);
      res.json(deletedCourse);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports=router;