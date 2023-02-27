import express from "express";
import {
  processPayment,
  sendStripeApiKey,
} from "../controllers/paymentController.js";

import { isAuthenticatedUser } from "../middleware/auth.js";

export const paymentRoutes = express.Router();

paymentRoutes
  .route("/payment/process")
  .post(isAuthenticatedUser, processPayment);
paymentRoutes.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);
