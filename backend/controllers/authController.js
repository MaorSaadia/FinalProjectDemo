const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const Student = require("./../models/studentModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

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

  const token = signToken(newStudent._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      student: newStudent,
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
  const token = signToken(student._id);

  res.status(200).json({
    status: "success",
    token,
  });
  //createSendToken(student, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("Your are not looged in! Please log in to get access", 401)
    );
  }
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist!",
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});
