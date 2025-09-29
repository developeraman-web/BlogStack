import mongoose from "mongoose";
const likeSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "blog",
    },
  },
  { timestamps: true }
);

const BlogLike = mongoose.model("BlogLike", likeSchema, "BlogLike");
export default BlogLike;
