const express = require("express");
const cors = require("cors");

const studentRouter = require("./routes/studentRoutes.js");
const apartmentRouter = require("./routes/apartmentRoutes.js");

const app = express();

app.use(express.json());
app.use(cors());
//app.use(morgan("dev"));

app.use((req, res, next) => {
  res.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/apartments", apartmentRouter);
app.use("/api/v1/students", studentRouter);

module.exports = app;
