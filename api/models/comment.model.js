import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
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
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comment", commentSchema, "comments");
export default Comment;
