import express from "express";
//import morgan from "morgan";

import studentRouter from "./routes/studentRoutes.js";
import apartmentRouter from "./routes/apartmentRoutes.js";

const app = express();

app.use(express.json());
//app.use(morgan("dev"));

app.use("/api/v1/apartments", apartmentRouter);
app.use("/api/v1/students", studentRouter);

export default app;
