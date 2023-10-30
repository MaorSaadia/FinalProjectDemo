const express = require("express");

const studentRouter = require("./routes/studentRoutes.js");
const apartmentRouter = require("./routes/apartmentRoutes.js");

const app = express();

app.use(express.json());
//app.use(morgan("dev"));

app.use("/api/v1/apartments", apartmentRouter);
app.use("/api/v1/students", studentRouter);

module.exports = app;
