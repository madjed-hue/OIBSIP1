import express from "express";
import {
  createPizza,
  createPizzaReview,
  deletePizza,
  deletePizzaReviews,
  getAdminPizza,
  getAllPizza,
  getPizzaDetails,
  getPizzaReviews,
  updatePizza,
  updatePizzaStock,
} from "../controllers/pizzaController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";

export const pizzaRoutes = express.Router();

//Create pizza (admin)
pizzaRoutes
  .route("/admin/pizza/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createPizza);

//get all pizza (users)
pizzaRoutes.route("/pizza/all").get(getAllPizza);

//get all pizza (admin)
pizzaRoutes
  .route("/admin/pizzas")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminPizza);

//Get Pizza Details
pizzaRoutes.route("/pizza/:id").get(getPizzaDetails);

//Update Delete and get Details Pizza
pizzaRoutes
  .route("/admin/pizza/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updatePizza)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deletePizza);

//Create/Update Review of a Pizza
pizzaRoutes.route("/review").put(isAuthenticatedUser, createPizzaReview);

pizzaRoutes
  .route("/reviews")
  .get(getPizzaReviews)
  .delete(isAuthenticatedUser, deletePizzaReviews);

//Update Pizza Stock
pizzaRoutes
  .route("/admin/pizza")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updatePizzaStock);
