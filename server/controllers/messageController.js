import ErrorHundeler from "../utils/errorHundeler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import Message from "../models/messagesModel.js";

//Create message
export const createMessage = catchAsyncError(async (req, res, next) => {
  const message = await Message.create(req.body);
  res.status(201).json({
    success: true,
    message,
  });
});

//Get message Details
export const getMessageDetails = catchAsyncError(async (req, res, next) => {
  let messages = await Message.find();
  if (!messages) {
    return next(new ErrorHundeler("Message Not Found", 404));
  }
  const message = messages.find(
    (msg) => msg._id.toString() !== req.query.id.toString()
  );
  res.status(200).json({
    success: true,
    message,
  });
});

// Delete message -- Admin
export const deleteMessage = catchAsyncError(async (req, res, next) => {
  let message = await Message.findById(req.params.id);
  if (!message) {
    return next(new ErrorHundeler("Message Not Found", 404));
  }

  await message.remove();
  res.status(200).json({
    success: true,
    message: "Message Deleted Successfully",
  });
});

// Get All message (Admin)
export const getAdminMessage = catchAsyncError(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});
