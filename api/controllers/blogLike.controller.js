import { handleError } from "../helpers/handleError.js";

import BlogLike from "../models/blogLike.model.js";
export const blogLike = async (req, res, next) => {
  try {
    const { author, blogId } = req.body;
    let like;
    like = await BlogLike.findOne({ author, blogId });
    let message;
    if (!like) {
      message = "liked";
      const newLike = new BlogLike({
        author,
        blogId,
      });
      await newLike.save();
    } else {
      message = "unliked";
      await BlogLike.findByIdAndDelete(like._id);
    }
    let hasUserLiked = message === "liked";
    const likeCount = await BlogLike.countDocuments({ blogId });

    res.status(200).json({
      success: true,
      message: `${message}`,
      count: likeCount,
      hasUserLiked,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};

export const likeCount = async (req, res, next) => {
  try {
    const { blogid, userid } = req.params;
    let hasUserLiked = false;
    const likeCount = await BlogLike.countDocuments({ blogId: blogid });
    if (userid) {
      const getUserLike = await BlogLike.countDocuments({
        blogId: blogid,
        author: userid,
      });
      if (getUserLike > 0) hasUserLiked = true;
    }

    res.status(200).json({
      success: true,
      message: "like count are sent as count",
      count: likeCount,
      hasUserLiked: hasUserLiked,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
