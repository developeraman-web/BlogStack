import { isValidObjectId } from "mongoose";
import { handleError } from "../helpers/handleError.js";
import Category from "../models/category.model.js";

export const getAllCategory = async (req, res, next) => {
  try {
    const category = await Category.find().sort({ name: 1 }).lean().exec();
    res.status(200).json({
      category,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
export const getUserCategory = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const category = await Category.find({ author: userid })
      .sort({ name: 1 })
      .lean()
      .exec();
    res.status(200).json({
      category,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
export const addCategory = async (req, res, next) => {
  try {
    const { name, slug, author } = req.body;
    const categoryExist = await Category.findOne({ slug });
    if (categoryExist) {
      return next(
        handleError(
          404,
          "Category already Exists, cannot add a duplicate category!"
        )
      );
    }
    const category = new Category({
      name,
      slug,
      author,
    });
    await category.save();
    res.status(200).json({
      success: true,
      message: "New category Added",
      category,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
export const showCategory = async (req, res, next) => {
  try {
    const { categoryid } = req.params;
    const category = await Category.findById(categoryid);
    if (!category) {
      return next(handleError(404, "Data not found"));
    }
    res.status(200).json({
      category,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
export const editCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    const { categoryid } = req.params;
    if (!isValidObjectId(categoryid)) {
      return next(handleError(404, "Category not found"));
    }
    const category = await Category.findByIdAndUpdate(
      categoryid,
      { name, slug },
      { new: true }
    );
    if (!category) {
      return next(handleError(404, "Data not found"));
    }
    res.status(200).json({
      message: "Category updated successfuly",
      category,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
export const deleteCategory = async (req, res, next) => {
  try {
    const { categoryid } = req.params;
    const category = await Category.findByIdAndDelete(categoryid);
    if (!category) {
      return next(handleError(404, "Data not found"));
    }
    res.status(200).json({
      message: "Category deleted successfuly",
      category,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
