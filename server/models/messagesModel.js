import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please fill the first name "],
  },
  lastName: {
    type: String,
    required: [true, "Please fill the last name "],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
  },
  phone: {
    type: Number,
    required: [true, "Please Enter Your Phone Number"],
  },
  text: {
    type: String,
    required: [true, "Please Describe your Message"],
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
