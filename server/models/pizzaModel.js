import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill the name of the pizza"],
  },
  description: {
    type: String,
    required: [true, "Please, Enter the description of this pizza"],
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  category: {
    type: String,
    required: [true, "Please Enter Pizza category"],
  },
  prices: {
    type: [Number],
    required: [true, "Please Enter the Prices"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    required: [true, "Please Enter Stock Quantiy Of this base Pizza"],
    maxLength: [3, "Stock Can Not Exceed 3 Characters"],
    default: 1,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Pizza = mongoose.model("Pizza", pizzaSchema);

export default Pizza;
