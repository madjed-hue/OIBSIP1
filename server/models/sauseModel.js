import mongoose from "mongoose";

const sauceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill the name of the Sauce"],
  },
  price: {
    type: Number,
    required: [true, "Please fill the Price of the Sauce"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter Stock Quantiy of this Sauce"],
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

const Sauce = mongoose.model("Sauce", sauceSchema);

export default Sauce;
