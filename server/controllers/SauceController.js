import ErrorHundeler from "../utils/errorHundeler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import Sauce from "../models/sauseModel.js";
import cloudinary from "cloudinary";

//Create Sauce
export const createSauce = catchAsyncError(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "pizza/sauces",
  });

  const photo = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  req.body.image = photo;

  const sauce = await Sauce.create(req.body);
  res.status(201).json({
    success: true,
    sauce,
  });
});

//Update Sauce
export const updateSauce = catchAsyncError(async (req, res, next) => {
  let sauce;

  try {
    sauce = await Sauce.findById(req.params.id);
    sauce.name = req.body.name;
    sauce.price = req.body.price;
    sauce.stock = req.body.stock;
    if (sauce.image !== "") {
      const imageId = sauce.image.public_id;
      await cloudinary.v2.uploader.destroy(imageId);
      const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "pizza/sauces",
      });
      sauce.image = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    await sauce.save();

    res.status(200).json({
      success: true,
      message: "Sauce Updated Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//Get sauce Details
export const getSauceDetails = catchAsyncError(async (req, res, next) => {
  let sauce = await Sauce.findById(req.params.id);
  if (!sauce) {
    return next(new ErrorHundeler("sauce Not Found", 404));
  }
  res.status(200).json({
    success: true,
    sauce,
  });
});

// Delete Sauce -- Admin
export const deleteSauce = catchAsyncError(async (req, res, next) => {
  let sauce = await Sauce.findById(req.params.id);
  if (!sauce) {
    return next(new ErrorHundeler("sauce Not Found", 404));
  }

  const imageId = sauce.image.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await sauce.remove();
  res.status(200).json({
    success: true,
    message: "sauce Deleted Successfully",
  });
});

// Get All Sauce (Admin)
export const getAdminSauce = catchAsyncError(async (req, res, next) => {
  const sauces = await Sauce.find();
  res.status(200).json({
    success: true,
    sauces,
  });
});

//Update stock of Sauce
export const updateSauceStock = catchAsyncError(async (req, res, next) => {
  const sauce = await Sauce.findById(req.query.sauceId);
  if (!sauce) {
    return next(new ErrorHundeler("Sauce Not Found", 404));
  }

  const stock = req.body.stock;

  await Sauce.findByIdAndUpdate(
    req.query.sauceId,
    { stock },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "Stock Updated successfully",
  });
});
