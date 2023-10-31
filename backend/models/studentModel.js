const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "נא למלא שם מלא"],
  },
  age: {
    type: String,
    required: [true, "נא למלא גיל"],
  },
  academic: {
    type: String,
    required: [true, "נא לבחור מוסד לימוד"],
  },
  department: {
    type: String,
    required: [true, " נא למלא מחלקה"],
  },
  yearbook: {
    type: String,
    required: [true, "נא לבחור שנת לימוד"],
  },
  email: {
    type: String,
    required: [true, "אנא ספק אימייל"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "אנא ספק אימייל חוקי"],
  },
  password: {
    type: String,
    required: [true, "נא למלא סיסמה"],
    minlength: [6, "הסיסמה צריכה להכיל 6 תווים לפחות"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "נא למלא אישור סיסמה"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "!סיסמאות לא תואמות",
    },
  },
});

studentSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

studentSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

studentSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
