const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());
//app.use(morgan("dev"));

const getAllApartments = (req, res) => {
  res.status(200).json({
    status: "success",
    name: "apartment name",
  });
};

const createApartments = (req, res) => {
  //console.log(req.body);
  res.send("Done");
};

app.route("/api/v1/apartments").get(getAllApartments).post(createApartments);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
