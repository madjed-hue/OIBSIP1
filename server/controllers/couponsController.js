import ErrorHundeler from "../utils/errorHundeler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import Coupon from "../models/couponsModel.js";

//Create coupons
export const createCoupons = catchAsyncError(async (req, res, next) => {
  const coupons = await Coupon.create(req.body);
  res.status(201).json({
    success: true,
    coupons,
  });
});

//Update coupons
export const updateCoupons = catchAsyncError(async (req, res, next) => {
  let coupons;

  try {
    coupons = await Coupon.findById(req.params.id);
    coupons.coupon = req.body.coupon;
    coupons.price = req.body.price;

    await coupons.save();

    res.status(200).json({
      success: true,
      message: "coupons Updated Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//Get coupons Details
export const getAllCoupons = catchAsyncError(async (req, res, next) => {
  let coupons = await Coupon.find();
  res.status(200).json({
    success: true,
    coupons,
  });
});

//Get coupons Details
export const getCouponsDetails = catchAsyncError(async (req, res, next) => {
  let coupons = await Coupon.findById(req.params.id);
  if (!coupons) {
    return next(new ErrorHundeler("coupons Not Found", 404));
  }
  res.status(200).json({
    success: true,
    coupons,
  });
});

// Delete coupons -- Admin
export const deleteCoupons = catchAsyncError(async (req, res, next) => {
  let coupons = await Coupon.findById(req.params.id);
  if (!coupons) {
    return next(new ErrorHundeler("coupons Not Found", 404));
  }

  await coupons.remove();
  res.status(200).json({
    success: true,
    message: "coupons Deleted Successfully",
  });
});
