import Blog from "../models/blog.model.js";
import cloudinary from "../config/cloudinary.js";
import { encode } from "entities";
import { handleError } from "../helpers/handleError.js";
import Category from "../models/category.model.js";
export const addBlog = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    let featuredImage = "";
    if (req.file) {
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, {
          folder: "blogApp",
          resource_type: "auto",
        })
        .catch((error) => {
          return next(handleError(500, error.message));
        });
      featuredImage = uploadResult.secure_url;
    }
    const blog = new Blog({
      author: data.author,
      category: data.category,
      blog: data.blog,
      title: data.title,
      slug: data.slug,
      featureImage: featuredImage,
      blogContent: encode(data.blogContent),
    });
    await blog.save();
    res.status(200).json({
      success: true,
      message: "Blog Added Successfuly",
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
export const editBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;

    const blog = await Blog.findById(blogid).populate("category", "name");
    if (!blog) {
      return next(handleError(404, "Data not found"));
    }
    res.status(200).json({
      blog,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
export const updateBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const data = JSON.parse(req.body.data);
    const blog = await Blog.findById(blogid);
    blog.category = data.category;
    blog.title = data.title;
    blog.slug = data.slug;
    blog.slug = data.slug;
    blog.blogContent = encode(data.blogContent);

    let featuredImage = blog.featureImage;
    if (req.file) {
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, {
          folder: "blogApp",
          resource_type: "auto",
        })
        .catch((error) => {
          return next(handleError(500, error.message));
        });
      featuredImage = uploadResult.secure_url;
    }
    blog.featureImage = featuredImage;
    await blog.save();
    res.status(200).json({
      success: true,
      message: "Blog updated Successfuly",
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
export const deleteBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const blog = await Blog.findByIdAndDelete(blogid);
    res.status(200).json({
      message: "Blog deleted Successfuly",
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
export const showAllBlog = async (req, res, next) => {
  try {
    let blog = await Blog.find()
      .sort({ name: 1 })
      .populate("author", "name avatar role")
      .populate("category", "name slug")

      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json({
      blog,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
export const showUserBlogs = async (req, res, next) => {
  try {
    const { userid } = req.params;
    let blog = await Blog.find({ author: userid })
      .sort({ name: 1 })
      .populate("author", "name")
      .populate("category", "name slug")

      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json({
      blog,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};

export const getBlog = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug })
      .populate("author", "name avatar")
      .populate("category", "name slug")
      .lean()
      .exec();
    if (!blog) {
      return next(handleError(404, "Data not found"));
    }
    res.status(200).json({
      blog,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};

export const getRelatedBlog = async (req, res, next) => {
  try {
    const { category, slug } = req.params;
    const categoryData = await Category.findOne({ slug: category });
    if (!categoryData) {
      return next(handleError(404, "category data not found"));
    }
    const categoryId = categoryData._id;
    const blog = await Blog.find({ category: categoryId, slug: { $ne: slug } })
      .lean()
      .exec();
    res.status(200).json({
      blog,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
export const getBlogByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const categoryData = await Category.findOne({ slug: category });
    if (!categoryData) {
      return next(handleError(404, "category data not found"));
    }
    const categoryId = categoryData._id;
    const blog = await Blog.find({ category: categoryId })
      .populate("author", "name avatar")
      .populate("category", "name slug")
      .lean()
      .exec();
    res.status(200).json({
      blog,
      categoryData,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
export const BlogSearch = async (req, res, next) => {
  try {
    const { q } = req.query;
    const blog = await Blog.find({ title: { $regex: q, $options: "i" } })
      .populate("author", "name avatar")
      .populate("category", "name slug")
      .lean()
      .exec();
    res.status(200).json({
      blog,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
