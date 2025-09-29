import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const checkuser = await User.findOne({ email });

    if (checkuser) {
      return next(handleError(409, "user already registered"));
    }

    const hashedPassword = bcryptjs.hashSync(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration Successful",
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let userExist = await User.findOne({ email });
    if (!userExist) {
      return next(handleError(404, "Invalid credentials"));
    }
    const hashedPassword = userExist.password;
    const checkPass = bcryptjs.compareSync(password, hashedPassword);
    if (!checkPass) {
      return next(handleError(404, "Invalid credentials"));
    }
    // create a payload
    const payload = {
      _id: userExist._id,
      name: userExist.name,
      email: userExist.email,
      avatar: userExist.avatar,
      role: userExist.role,
    };
    // sign a token
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    // send cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    userExist = userExist.toObject({ getters: true });
    delete userExist.password;

    res.status(200).json({
      success: true,
      user: userExist,
      message: "Logged in successfully",
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const { name, email, avatar } = req.body;
    // check if user exist in db
    let user = await User.findOne({ email });
    // if user is not present, create one
    if (!user) {
      const password = Math.round(Math.random() * 10000).toString();
      const hashedPassword = bcryptjs.hashSync(password);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        avatar,
      });
      // assign created user
      user = await newUser.save();
    }
    // generate token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
      process.env.JWT_SECRET
    );

    // send cookiet
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    user = user.toObject({ getters: true });
    delete user.password;

    res.status(200).json({
      success: true,
      user,
      message: "Logged in successfully",
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
export const logout = async (req, res, next) => {
  try {
    // send cookies
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
