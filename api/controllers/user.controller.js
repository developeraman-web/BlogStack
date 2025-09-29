import cloudinary from "../config/cloudinary.js";
import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const getUser = async (req, res, next) => {
  try {
    const { userid } = req.params;

    const user = await User.findOne({ _id: userid }).lean().exec();

    if (!user) {
      return next(handleError(404, "user not found"));
    }

    const newUser = user;
    delete newUser.password;

    res.status(200).json({
      success: true,
      message: "user data found",
      user: newUser,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find().lean().exec();

    if (!user) {
      return next(handleError(404, "users not found"));
    }
    const usersArr = [];
    user.map((element) => {
      let singleUser = { ...element };
      delete singleUser.password;
      delete singleUser.bio;
      usersArr.push(singleUser);
    });

    res.status(200).json({
      success: true,
      message: "user data found",
      users: usersArr,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const user = await Comment.findByIdAndDelete(userid);
    res.status(200).json({
      success: true,
      message: "user Deleted succesfully",
      user,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    const { userid } = req.params;
    let user = await User.findById(userid);
    user.name = data.name;
    user.email = data.email;
    user.bio = data.bio;

    if (data.password && data.password.length > 0) {
      const hashedPassword = bcryptjs.hashSync(data.password);
      user.password = hashedPassword;
    }
    if (req.file) {
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, {
          folder: "blogApp",
          resource_type: "auto",
        })
        .catch((error) => {
          return next(handleError(500, error.message));
        });
      user.avatar = uploadResult.secure_url;
    }
    const newUser = user.toObject({ getters: true });
    delete newUser.password;
    await user.save();

    res.status(200).json({
      success: true,
      message: "data updated",
      user: newUser,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
