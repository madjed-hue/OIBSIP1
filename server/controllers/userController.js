import ErrorHundeler from "../utils/errorHundeler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import User from "../models/userModel.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";
import { createHash } from "crypto";
import { v2 } from "cloudinary";
import sendVerificationUrl from "../utils/verifyUser.js";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";

export const registerUser = catchAsyncError(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "pizza/avatars",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
  sendVerificationUrl(user, req);
});

export const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //check if user enter email and password
  if (!email || !password) {
    return next(new ErrorHundeler("Please enter email or password", 401));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHundeler("Invalid Email or Password"));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHundeler("Invalid Email or Password", 401));
  }
  sendToken(user, 200, res);
});

export const logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});

export const verifyUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  // Verifying the JWT token
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decode.id);

  if (user.verified === "true") {
    return next(new ErrorHundeler("account already verified", 400));
  }

  if (!token) {
    return next(
      new ErrorHundeler(
        "Email verification failed, possibly the link is invalid or expired",
        400
      )
    );
  } else {
    user.verified = true;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Email verifified successfully",
    });
  }
});

export const resendVerifyEmail = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHundeler("User Not Found", 404));
  }
  //Get reset Password Toke
  const verifyToken = user.getResetPasswordToken();

  const VerificationUrl = `${process.env.FRONTEND_URL}/verify/${verifyToken}`;

  const message = `Your Password Reset Token is :- \n\n ${VerificationUrl} \n\n If you do not request this email, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Pizza Hot Store Verification Link`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    return next(new ErrorHundeler(error.message, 500));
  }
});

export const forgetPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHundeler("User Not Found", 404));
  }

  //Get reset Password Toke
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your Password Reset Token is :- \n\n ${resetPasswordUrl} \n\n If you do not request this email, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Pizza Hot Store Password recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHundeler(error.message, 500));
  }
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
  //Creating token hash
  const resetPasswordToken = createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHundeler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHundeler("Password doesn't match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});

export const getUserDetails = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

export const updatePassword = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHundeler("The Old Password is Incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHundeler("Password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();
  sendToken(user, 200, res);
});

export const updateProfile = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.user.id);

  try {
    user = await User.findById(req.user.id);
    user.name = req.body.name;
    user.email = req.body.email;
    if (req.body.avatar !== "") {
      const imageId = user.avatar.public_id;
      await cloudinary.v2.uploader.destroy(imageId);
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "pizza/avatars",
        width: 150,
        crop: "scale",
      });
      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    await user.save();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHundeler(error.message));
  }
});

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

export const getSingleUsers = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHundeler(`User does not exist with Id : ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

export const updateUserRole = catchAsyncError(async (req, res, next) => {
  let user;

  try {
    user = await User.findById(req.params.id);
    user.name = req.body.name;
    user.email = req.body.email;
    user.role = req.body.role;
    await user.save();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHundeler(error.message));
  }
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHundeler(`user doesn't exist with Id : ${req.params.id}`, 400)
    );
  }
  const imageId = user.avatar.public_id;

  await v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
