export const getAllApartments = (req, res) => {
  res.status(200).json({
    status: "success",
    name: "apartment name",
  });
};

export const createApartment = (req, res) => {
  //console.log(req.body);
  res.send("Done");
};
