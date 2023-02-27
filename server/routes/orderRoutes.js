import express from "express";
import {
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  myOrders,
  newOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";

export const orderRoutes = express.Router();

//Create Order
orderRoutes.route("/order/new").post(isAuthenticatedUser, newOrder);

//get single order
orderRoutes.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

//get user orders
orderRoutes.route("/orders/me").get(isAuthenticatedUser, myOrders);

//Get All orders for admin
orderRoutes
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

orderRoutes
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrderStatus)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);
