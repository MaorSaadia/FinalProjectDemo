const express = require("express");
const cors = require("cors");

const studentRouter = require("./routes/studentRoutes.js");
const apartmentRouter = require("./routes/apartmentRoutes.js");
const AppError = require("./utils/appError.js");
const globalErrorHandler = require("./controllers/errorController.js");

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/apartments", apartmentRouter);
app.use("/api/v1/students", studentRouter);

// app.use((err, req, res, next) => {
//   res.status(err.status || 500).json({
//     status: "error",
//     message: err.message,
//   });
// });

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
