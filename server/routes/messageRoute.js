import express from "express";
import {
  createMessage,
  deleteMessage,
  getAdminMessage,
  getMessageDetails,
} from "../controllers/messageController.js";

import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";

export const messageRoutes = express.Router();

//Create Message (admin)
messageRoutes.route("/message/new").post(createMessage);

// Delete and get Details Message

messageRoutes
  .route("/admin/message/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteMessage);

//get all Message (admin)
messageRoutes
  .route("/admin/messages")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminMessage);

//  get Details Message
messageRoutes
  .route("/admin/message")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getMessageDetails);
