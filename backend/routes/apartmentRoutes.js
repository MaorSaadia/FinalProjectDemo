const express = require("express");
const apartmentControllers = require("./../controllers/apartmentControllers");

const router = express.Router();

router
  .route("/")
  .get(apartmentControllers.getAllApartments)
  .post(apartmentControllers.createApartment);

module.exports = router;
