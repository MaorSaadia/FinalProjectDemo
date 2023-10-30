const express = require("express");
const StudentControllers = require("./../controllers/StudentControllers");

const router = express.Router();

router.param("id", (req, res, next, val) => {
  next();
});

router
  .route("/")
  .get(StudentControllers.getAllStudents)
  .post(StudentControllers.createStudent);
router
  .route("/:id")
  .get(StudentControllers.getStudent)
  .patch(StudentControllers.updateStudent)
  .delete(StudentControllers.deleteStudent);

module.exports = router;
