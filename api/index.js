import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import { createListing } from "./controller/listing.controller.js";
dotenv.config();
const app = express();
const PORT = 3000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongoose connected"))
  .catch((error) => console.log(error));
app.listen(PORT || 3001, () => {
  console.log("Server is running on port", PORT);
});
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", createListing);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
