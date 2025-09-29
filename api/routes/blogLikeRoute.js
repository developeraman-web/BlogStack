import express from "express";
import { blogLike, likeCount } from "../controllers/blogLike.controller.js";
import { authenticate } from "../middleware/authenticate.js";
const blogLikeRoute = express.Router();

blogLikeRoute.post("/do-like/", authenticate, blogLike);
blogLikeRoute.get("/count/:blogid/{:userid}", likeCount);
export default blogLikeRoute;
