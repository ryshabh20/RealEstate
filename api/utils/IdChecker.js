import { errorHandler } from "./error.js";
import mongoose from "mongoose";
export const idChecker = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    next(errorHandler(400, "Invalid Object Id"));
  }
  next();
};
