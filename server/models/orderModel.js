import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  deliveryInfo: {
    address: { type: String, required: true },
    phoneNo: {
      type: Number,
      required: true,
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      pizza: {
        type: mongoose.Schema.ObjectId,
        ref: "Pizza",
        required: true,
      },
      sauce: {
        type: mongoose.Schema.ObjectId,
        ref: "Sauce",
        required: true,
      },
      sauceName: {
        type: String,
        required: true,
      },
      saucePrice: {
        type: Number,
        required: true,
      },
      cheese: {
        type: mongoose.Schema.ObjectId,
        ref: "Cheese",
        required: true,
      },
      cheeseName: {
        type: String,
        required: true,
      },
      cheesePrice: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paisAt: {
    type: Date,
    required: true,
  },
  itemsPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  couponPrice: {
    type: Number,
    default: 0,
  },
  deliveryPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
