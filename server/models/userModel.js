import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import pkg from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomBytes, createHash } from "crypto";

const { hash, compare } = pkg;
const { sign } = jwt;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name is required, Please check again"],
    maxLength: [30, "The name cant be more than 30 characters"],
    minLength: [4, "The name cant be less than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "The email is required, Please Enter your Email"],
    unique: true,
    validate: [isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "The password is required"],
    maxLength: [15, "The password should be les than 15 charachters"],
    minLength: [6, "The password should be more than 6"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await hash(this.password, 10);
});

//validate the name and the the email before changing
userSchema.pre("findByIdAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});
//JWT Token
userSchema.methods.getJWTToken = function () {
  return sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//compare Password
userSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};

//Generating Password reset Token
userSchema.methods.getResetPasswordToken = function () {
  //Generating Token
  const resetToken = randomBytes(20).toString("hex");

  //Hashing and added it to userSchema
  this.resetPasswordToken = createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
