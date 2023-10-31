const jwt = require("jsonwebtoken");
const Student = require("./../models/studentModel");
const catchAsync = require("./../utils/catchAsync");

exports.signup = catchAsync(async (req, res, next) => {
  const newStudent = await Student.create({
    name: req.body.name,
    age: req.body.age,
    academic: req.body.academic,
    department: req.body.department,
    yearbook: req.body.yearbook,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = jwt.sign({ id: newStudent._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: "success",
    token,
    data: {
      student: newStudent,
    },
  });
});
