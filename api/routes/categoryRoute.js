import express from "express";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getAllCategory,
  getUserCategory,
  showCategory,
} from "../controllers/category.controller.js";
import { authenticate } from "../middleware/authenticate.js";
const categoryRoute = express.Router();

categoryRoute.post("/add", authenticate, addCategory); // to add category-> only logged in users can do this
categoryRoute.put("/update/:categoryid", authenticate, editCategory); // to update category
categoryRoute.get("/show/:categoryid", authenticate, showCategory); // to show that particulare category when user is on edit category page of that category
categoryRoute.get("/all-category", getAllCategory); // all categories, public access
categoryRoute.get("/get-user-category/:userid", authenticate, getUserCategory);
categoryRoute.delete("/delete/:categoryid", authenticate, deleteCategory);
export default categoryRoute;
