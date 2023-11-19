const express = require("express");
const authController = require("./../controllers/authController");
const studentController = require("./../controllers/studentController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword", authController.resetPassword);
router.patch("/updateMyPassword", authController.updatePassword);

router.patch("/updateMe", authController.protect, studentController.updateMe);

router.route("/").get(studentController.getAllStudents);
router
  .route("/:id")
  .get(studentController.getStudent)
  .patch(studentController.updateStudent)
  .delete(studentController.deleteStudent);
module.exports = router;
