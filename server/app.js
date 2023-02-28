import express from "express";
import errorMiddleWear from "./middleware/error.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import cors from "cors";

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "../server/.env" });
}

export const app = express();

app.use(
  cors({
    origin: "https://fateh-pizzario.netlify.app",
    credentials: "include",
  })
);

app.use(errorMiddleWear);

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static("public"));

import { userRoutes } from "./routes/userRoutes.js";
import { pizzaRoutes } from "./routes/pizzaRoutes.js";
import { cheeseRoutes } from "./routes/cheeseRoutes.js";
import { sauceRoutes } from "./routes/sauceRoutes.js";
import { orderRoutes } from "./routes/orderRoutes.js";
import { paymentRoutes } from "./routes/paymentRoute.js";
import { couponsRoutes } from "./routes/couponsRoute.js";
import { messageRoutes } from "./routes/messageRoute.js";

app.use("/api/v1", userRoutes);
app.use("/api/v1", pizzaRoutes);
app.use("/api/v1", cheeseRoutes);
app.use("/api/v1", sauceRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoutes);
app.use("/api/v1", couponsRoutes);
app.use("/api/v1", messageRoutes);
