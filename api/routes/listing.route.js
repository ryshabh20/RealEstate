import express from "express";

import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings
} from "../controller/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { idChecker } from "../utils/IdChecker.js";
const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, idChecker, updateListing);
router.get("/get/:id", idChecker, getListing);
router.get('/get',getListings)

export default router;
