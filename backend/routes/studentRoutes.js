const express = require("express");
const StudentController = require("../controllers/StudentController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);

router
  .route("/")
  .get(StudentController.getAllStudents)
  .post(StudentController.createStudent);
router
  .route("/:id")
  .get(StudentController.getStudent)
  .patch(StudentController.updateStudent)
  .delete(StudentController.deleteStudent);

module.exports = router;
