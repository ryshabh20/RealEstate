import express from "express-router";
import { createListing } from "../controller/listing.controller";
import { verifyToken } from "../utils/verifyUser";
const router = express.Router();

router.post("/create", verifyToken, createListing);

export default router;
