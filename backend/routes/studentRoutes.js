const express = require("express");
const studentController = require("./../controllers/studentController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.patch("/updateMyPassword", authController.updatePassword);

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
