import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  coupon: {
    type: String,
    required: [true, "Please Enter Coupon"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter the Price of the Coupon"],
  },
});

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
