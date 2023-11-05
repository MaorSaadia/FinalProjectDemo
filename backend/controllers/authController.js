const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const Student = require("./../models/studentModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const sendEmail = require("./../utils/email");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // const cookieOptions = {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  // };

  // if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  // res.cookie("jwt", token, cookieOptions);

  // // Remove the password from the output
  // user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
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
  createSendToken(student, 200, res);
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

  // 3) Check if student still exists
  const currentStudent = await Student.findById(decoded.id);
  if (!currentStudent) {
    return next(
      new AppError(
        "The student belonging to this token does no longer exist!",
        401
      )
    );
  }

  // 4) Check if student changed password after the token was issued
  if (currentStudent.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "student recently changed password! Please log in again",
        401
      )
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.student = currentStudent;
  next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get student based on POSTED email
  const student = await Student.findOne({ email: req.body.email });
  if (!student) {
    return next(
      new AppError("There is no student with this email address", 404)
    );
  }

  // 2) Generte the random reset token
  const resetToken = student.createPasswordResetToken();
  await student.save({ validateBeforeSave: false });

  // 3) Send it to student's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/students/resetPassword/${resetToken}}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and
  passwordConfirm to: ${resetURL}.\n if you didn't forget your password. please ignore thid email!`;

  try {
    await sendEmail({
      email: student.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    student.passwordResetToken = undefined;
    student.passwordResetExpires = undefined;
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
  // 1) get student based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const student = await Student.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) if token has not expired, and there is student, set the new password
  if (!student) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  student.password = req.body.password;
  student.passwordConfirm = req.body.passwordConfirm;
  student.passwordResetToken = undefined;
  student.passwordResetExpires = undefined;
  await student.save();

  // 3) Update changedPasswordAt property for the student

  // 4) Log the student in, send JWT
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
