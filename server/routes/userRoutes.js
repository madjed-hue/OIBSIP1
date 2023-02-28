import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUsers,
  updateUserRole,
  deleteUser,
  verifyUser,
  resendVerifyEmail,
} from "../controllers/userController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";
export const userRoutes = express.Router();

userRoutes.route("/register").post(registerUser);
userRoutes.route("/user/verify/:token").put(verifyUser);
userRoutes.route("/user/verify").post(resendVerifyEmail);
userRoutes.route("/login").post(loginUser);
userRoutes.route("/password/forgot").post(forgetPassword);
userRoutes.route("/password/reset/:token").put(resetPassword);
userRoutes.route("/logout").get(logoutUser);
userRoutes.route("/me").get(isAuthenticatedUser, getUserDetails);
userRoutes.route("/password/update").put(isAuthenticatedUser, updatePassword);
userRoutes.route("/me/update").put(isAuthenticatedUser, updateProfile);

userRoutes
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
userRoutes
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUsers)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);
