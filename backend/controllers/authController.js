const jwt = require("jsonwebtoken");

const Student = require("./../models/studentModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Email = require("../utils/email");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // Check if any of the required fields are empty
  const requiredFields = [
    "name",
    "age",
    "academic",
    "department",
    "yearbook",
    "gender",
    "email",
    "password",
    "passwordConfirm",
  ];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return next(new AppError("יש למלא את כל השדות", 400));
    }
  }

  const newStudent = await Student.create({
    name: req.body.name,
    age: req.body.age,
    academic: req.body.academic,
    department: req.body.department,
    yearbook: req.body.yearbook,
    gender: req.body.gender,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newStudent._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newStudent,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("אנא ספק אימייל וסיסמה", 400));
  }

  // 2) Check if student exists && password is correct
  const student = await Student.findOne({ email }).select("+password");

  if (
    !student ||
    !(await student.correctPassword(password, student.password))
  ) {
    return next(new AppError("אימייל או סיסמה שגויים", 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(student, 200, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const requiredFields = ["email"];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return next(new AppError("יש למלא אימייל", 400));
    }
  }

  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!re.test(email)) {
    return next(new AppError("אנא ספק אימייל חוקי", 400));
  }

  // 1) Get student based on POSTED email
  const student = await Student.findOne({ email: req.body.email });
  if (!student) {
    return next(new AppError("אין משתמש עם כתובת אימייל זו", 404));
  }

  const randomNumber = Math.random() * (999999 - 100000) + 100000;
  const OTP = Math.floor(randomNumber);
  const otpExpire = 10 * 60 * 1000;

  student.otp = OTP;
  student.otpExpire = new Date(Date.now() + otpExpire);
  console.log("OTP: ", OTP);

  await student.save({ validateBeforeSave: false });

  // const message = `Your OTP for Reseting Password is ${OTP}`;

  try {
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/students/forgotPassword`;
    console.log(resetUrl);
    await new Email(student, resetUrl).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message: "OTP sent to email!",
    });
  } catch (err) {
    student.otp = undefined;
    student.otpExpire = undefined;
    await student.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "Theres was an error sending the email. Try again later!",
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { otp, password } = req.body;

  const student = await Student.findOne({
    otp,
    otpExpire: {
      $gt: Date.now(),
    },
  });

  if (!student) {
    return next(new AppError("קוד האימות לא תקין או לא בתוקף", 400));
  }

  if (!password) {
    return next(new AppError("יש למלא סיסמה חדשה", 400));
  }

  student.password = req.body.password;
  student.passwordConfirm = req.body.passwordConfirm;
  student.otp = undefined;
  student.otpExpire = undefined;

  await student.save();

  createSendToken(student, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get student from collection
  const student = await Student.findById(req.student.id).select("+password");

  // 2) Check if POSTed current password is correct
  if (!student.correctPassword(req.body.passwordCurrent, student.password)) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // 3) if so, update password
  student.password = req.body.password;
  student.passwordConfirm = req.body.passwordConfirm;
  await student.save();

  // 4) Log student in, send JWT
  createSendToken(student, 200, res);
});
