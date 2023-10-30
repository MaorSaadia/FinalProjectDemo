import express from "express";
import {
  getAllApartments,
  createApartment,
} from "./../controllers/apartmentControllers.js";

const router = express.Router();

router.route("/").get(getAllApartments).post(createApartment);

export default router;
