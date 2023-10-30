const express = require("express");
const studentController = require("./../controllers/StudentControllers");

const router = express.Router();

router.param("id", (req, res, next, val) => {
  next();
});

router
  .route("/")
  .get(studentController.getAllStudents)
  .post(studentController.createStudent);
router
  .route("/:id")
  .get(studentController.getStudent)
  .patch(studentController.updateStudent)
  .delete(studentController.deleteStudent);

module.exports = router;
