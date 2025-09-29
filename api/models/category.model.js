import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

const Category = mongoose.model("category", categorySchema, "category");
export default Category;
