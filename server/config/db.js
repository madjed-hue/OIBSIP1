import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

export const connectDatabase = () => {
  mongoose.set("strictQuery", false);

  mongoose
    .connect(process.env.MONGO_URI)
    .then((c) => {
      console.log(`Mongodb connected to ${c.connection.host}`);
    })
    .catch((error) => {
      console.log(error);
    });
};
