const express = require("express");
const morgan = require("morgan");

const studentRouter = require("./routes/studentRoutes");
const apartmentRouter = require("./routes/apartmentRoutes");

const app = express();

app.use(express.json());
//app.use(morgan("dev"));

app.use("/api/v1/apartments", apartmentRouter);
app.use("/api/v1/students", studentRouter);

module.exports = app;
