import express from "express";
import {
  addComment,
  commentCount,
  deleteComment,
  getAllComments,
  showAllComments,
} from "../controllers/comment.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { adminAuthentication } from "../middleware/adminAuthentication.js";
const commentRoute = express.Router();

// comment routes are here..
commentRoute.post("/add", authenticate, addComment);
commentRoute.get("/show-all/:blogid", showAllComments); // all comments of single blog
commentRoute.get("/count/:blogid", commentCount);
commentRoute.get("/get-all-comments", adminAuthentication, getAllComments); // all comments of whole application
commentRoute.delete("/delete/:commentid", adminAuthentication, deleteComment);
export default commentRoute;
