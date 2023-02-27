import ErrorHundeler from "../utils/errorHundeler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import Cheese from "../models/cheeseModel.js";
import cloudinary from "cloudinary";

//Create Cheese
export const createCheese = catchAsyncError(async (req, res, next) => {
  // const { name, price, stock, image } = req.body;

  const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "pizza/cheeses",
  });

  const photo = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  req.body.image = photo;
  const cheese = await Cheese.create(req.body);
  res.status(201).json({
    success: true,
    cheese,
  });
});

//Update Cheese
export const updateChees = catchAsyncError(async (req, res, next) => {
  let cheese;

  try {
    cheese = await Cheese.findById(req.params.id);
    cheese.name = req.body.name;
    cheese.price = req.body.price;
    cheese.stock = req.body.stock;
    if (cheese.image !== "") {
      const imageId = cheese.image.public_id;
      await cloudinary.v2.uploader.destroy(imageId);
      const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "pizza/cheeses",
      });
      cheese.image = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    await cheese.save();

    res.status(200).json({
      success: true,
      message: "Cheese Updated Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//Get Cheese Details
export const getCheeseDetails = catchAsyncError(async (req, res, next) => {
  let cheese = await Cheese.findById(req.params.id);
  if (!cheese) {
    return next(new ErrorHundeler("Cheese Not Found", 404));
  }
  res.status(200).json({
    success: true,
    cheese,
  });
});

// Delete Cheese -- Admin
export const deleteCheese = catchAsyncError(async (req, res, next) => {
  let cheese = await Cheese.findById(req.params.id);
  if (!cheese) {
    return next(new ErrorHundeler("Cheese Not Found", 404));
  }

  const imageId = cheese.image.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await cheese.remove();
  res.status(200).json({
    success: true,
    message: "Cheese Deleted Successfully",
  });
});

// Get All Cheese (Admin)
export const getAdminCheese = catchAsyncError(async (req, res, next) => {
  const cheeses = await Cheese.find();
  res.status(200).json({
    success: true,
    cheeses,
  });
});

//Update stock of Cheese
export const updateCheeseStock = catchAsyncError(async (req, res, next) => {
  const cheese = await Cheese.findById(req.query.cheeseId);
  if (!cheese) {
    return next(new ErrorHundeler("Cheese Not Found", 404));
  }

  const stock = req.body.stock;

  await Cheese.findByIdAndUpdate(
    req.query.cheeseId,
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
