import mongoose from "mongoose";

const cheeseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill the name of the Cheese"],
  },
  price: {
    type: Number,
    required: [true, "Please fill the Price of the Cheese"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter Stock Quantiy of this cheese"],
    maxLength: [3, "Stock Can Not Exceed 3 Characters"],
    default: 1,
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
});

const Cheese = mongoose.model("Cheese", cheeseSchema);

export default Cheese;
