import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";
import upload from "../config/multer.js";
import { adminAuthentication } from "../middleware/adminAuthentication.js";
import { authenticate } from "../middleware/authenticate.js";
const userRoute = express.Router();
userRoute.get("/get-user/:userid", authenticate, getUser);
userRoute.get("/get-all-users", adminAuthentication, getAllUsers); // only admin can see all users
userRoute.delete("/delete/:userid", adminAuthentication, deleteUser); // only admin can delete the user
userRoute.put(
  "/update-user/:userid",
  authenticate,
  upload.single("file"),
  updateUser
);
export default userRoute;
