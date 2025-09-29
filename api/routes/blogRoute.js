import express from "express";
import {
  addBlog,
  BlogSearch,
  deleteBlog,
  editBlog,
  getBlog,
  getBlogByCategory,
  getRelatedBlog,
  showAllBlog,
  showUserBlogs,
  updateBlog,
} from "../controllers/blog.controller.js";
import upload from "../config/multer.js";
import { addComment } from "../controllers/comment.controller.js";
import { authenticate } from "../middleware/authenticate.js";
const blogRoute = express.Router();
// blog routes are here..
blogRoute.post("/add", authenticate, upload.single("file"), addBlog);
blogRoute.get("/edit/:blogid", authenticate, editBlog);
blogRoute.put(
  "/update/:blogid",
  authenticate,
  upload.single("file"),
  updateBlog
);
blogRoute.get("/get-all", showAllBlog);
blogRoute.get("/get-blog/:slug", getBlog);
blogRoute.get("/get-related-blog/:category/:slug", getRelatedBlog);
blogRoute.get("/get-user-blog/:userid", authenticate, showUserBlogs);
blogRoute.get("/get-blog-by-category/:category", getBlogByCategory);
blogRoute.get("/search", BlogSearch);
blogRoute.delete("/delete/:blogid", authenticate, deleteBlog);

// comment routes are here..
blogRoute.post("/comment", addComment);
export default blogRoute;
