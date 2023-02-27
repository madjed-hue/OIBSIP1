import express from "express";
import {
  createCoupons,
  deleteCoupons,
  getCouponsDetails,
  updateCoupons,
  getAllCoupons,
} from "../controllers/couponsController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";

export const couponsRoutes = express.Router();

//Create Coupons (admin)
couponsRoutes
  .route("/admin/coupons/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createCoupons);

//Update Delete and get Details Coupons
couponsRoutes
  .route("/admin/coupons/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getCouponsDetails)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCoupons)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCoupons);

couponsRoutes.route("/coupons/:id").get(getCouponsDetails);

//get all Coupons
couponsRoutes.route("/coupons").get(isAuthenticatedUser, getAllCoupons);
