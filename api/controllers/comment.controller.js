import { handleError } from "../helpers/handleError.js";
import Comment from "../models/comment.model.js";
export const addComment = async (req, res, next) => {
  try {
    const { author, blogId, comment } = req.body;

    const newComment = new Comment({
      author,
      blogId,
      comment: comment,
    });
    await newComment.save();
    res.status(200).json({
      success: true,
      message: "comment added",
      comment: newComment,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
export const showAllComments = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const comment = await Comment.find({ blogId: blogid })
      .populate("author", "name avatar")
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.status(200).json({
      success: true,
      message: "comment found succesfully",
      comment,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
export const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find()
      .populate("author", "name")
      .populate("blogId", "title")
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.status(200).json({
      success: true,
      message: "comments found succesfully",
      comments,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
export const deleteComment = async (req, res, next) => {
  try {
    const { commentid } = req.params;
    const comment = await Comment.findByIdAndDelete(commentid);
    res.status(200).json({
      success: true,
      message: "comment Deleted succesfully",
      comment,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
export const commentCount = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const commentCount = await Comment.countDocuments({ blogId: blogid });
    res.status(200).json({
      success: true,
      message: "comment found succesfully",
      commentCount,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
