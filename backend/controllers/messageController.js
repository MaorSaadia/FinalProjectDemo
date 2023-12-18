const Message = require("../models/messageModal");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { getDataUri } = require("../utils/features");

const upload = multer({
  storage: multerStorage,
});

exports.uploadImage = upload.single("image");

exports.addMessage = catchAsync(async (req, res, next) => {
  const { chatId, senderId, messageText, replyingTo, image } = req.body;

  const message = new Message({
    chatId,
    senderId,
    messageText,
    replyingTo,
  });

  if (req.file || image) {
    const file = getDataUri(req.file);

    const uploadToCloud = await cloudinary.v2.uploader.upload(file.content, {
      folder: "Messages",
    });
    image = {
      public_id: uploadToCloud.public_id,
      url: uploadToCloud.secure_url,
    };
  }
  const result = await message.save();
  res.status(200).json(result);
});

exports.getMessage = catchAsync(async (req, res, next) => {
  const { chatId } = req.params;

  const result = await Message.find({ chatId });

  if (!result) {
    return next(new AppError("לא נמצא צ'אט", 404));
  }

  res.status(200).json(result);
});
