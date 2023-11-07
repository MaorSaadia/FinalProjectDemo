const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.UpdateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!doc) {
        return next(new AppError("No document found with that ID", 404));
      }

      res.status(200).json({
        status: "success",
        data: {
          data: doc,
        },
      });
    } catch (err) {
      res.status(404)({
        status: "fail",
        message: err,
      });
    }
  });

exports.CreateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    // doc.findOne({_id: req.parmas.id})

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

// exports.getAll = (Model) =>
//   catchAsync(async (req, res, next) => {
//     // console.log(req.query);

//     // To allow for nested Get reviews on tour
//     let filter = {};
//     if (req.params.tourId) filter = { tour: req.params.tourId };

//     //EXCUTE QUERY
//     const features = new APIfeatures(Model.find(filter), req.query)
//       .filter()
//       .sort()
//       .limitFields()
//       .paginate();
//     // const doc = await features.query.explain();
//     const doc = await features.query;

//     //SEND RESPONSE
//     res.status(200).json({
//       status: "success",
//       results: doc.length,
//       data: {
//         data: doc,
//       },
//     });
//   });
