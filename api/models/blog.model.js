import mongoose from "mongoose";
const blogSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "category",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    blogContent: {
      type: String,
      required: true,
      trim: true,
    },
    featureImage: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("blog", blogSchema, "blogs");
export default Blog;
