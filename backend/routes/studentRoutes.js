import express from "express";
import {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} from "./../controllers/StudentControllers.js";

const router = express.Router();

router.param("id", (req, res, next, val) => {
  next();
});

router.route("/").get(getAllStudents).post(createStudent);
router.route("/:id").get(getStudent).patch(updateStudent).delete(deleteStudent);

export default router;
