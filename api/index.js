import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import AuthRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import blogRoute from "./routes/blogRoute.js";
import commentRoute from "./routes/commentRoute.js";
import blogLikeRoute from "./routes/blogLikeRoute.js";
dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// route setup
let count = 0;
app.use("/api/auth", AuthRoute);
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/blog", blogRoute);
app.use("/api/comment", commentRoute);
app.use("/api/like", blogLikeRoute);
mongoose
  .connect(process.env.MONGODB_CONN, { dbName: "blogApp" })
  .then(() => console.log("database connected"))
  .catch((err) => console.log("database conn failed", err));

app.listen(port, () => {
  console.log("server running on port:", port);
});

// error handler middleware

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
