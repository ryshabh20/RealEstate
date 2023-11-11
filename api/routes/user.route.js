import express from "express";
import { test,update } from "../controller/user.controller.js";
const router = express.Router();
router.get("/test", test);
router.post("/update/:id",update)
export default router;
