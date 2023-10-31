const mongoose = require("mongoose");
const validator = require("validator");

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
    minlength: 6,
    // select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "סיסמאות לא תואמות"],
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
