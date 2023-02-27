import express from "express";
import {
  createCheese,
  deleteCheese,
  getAdminCheese,
  getCheeseDetails,
  updateChees,
  updateCheeseStock,
} from "../controllers/cheeseController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";

export const cheeseRoutes = express.Router();

//Create Cheese (admin)
cheeseRoutes
  .route("/admin/cheese/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createCheese);

//Update Delete and get Details cheese
cheeseRoutes
  .route("/admin/cheese/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getCheeseDetails)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateChees)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCheese);

cheeseRoutes.route("/cheese/:id").get(getCheeseDetails);

//get all Cheese (admin)
cheeseRoutes
  .route("/admin/cheese")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminCheese);

cheeseRoutes.route("/cheeses").get(getAdminCheese);

//Update Cheese Stock
cheeseRoutes
  .route("/admin/cheese")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCheeseStock);
