import express from "express";
import {
  createSauce,
  deleteSauce,
  getAdminSauce,
  getSauceDetails,
  updateSauce,
  updateSauceStock,
} from "../controllers/SauceController.js";

import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";

export const sauceRoutes = express.Router();

//Create sauce (admin)
sauceRoutes
  .route("/admin/sauce/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createSauce);

//Update Delete and get Details sauce
sauceRoutes
  .route("/admin/sauce/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSauceDetails)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateSauce)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteSauce);

sauceRoutes.route("/sauce/:id").get(getSauceDetails);

//get all sauce (admin)
sauceRoutes
  .route("/admin/sauce")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminSauce);

//get all sauce (admin)
sauceRoutes.route("/sauces").get(getAdminSauce);

//Update Sauce Stock
sauceRoutes
  .route("/admin/sauce")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateSauceStock);
