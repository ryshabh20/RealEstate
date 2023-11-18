import Listing from "../modal/listing.modal.js";
import { errorHandler } from "../utils/error.js";
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  console.log("this is the listing", listing);
  if (!listing) {
    next(errorHandler(404, "Listing not found!"));
  }
  console.log("listing.userRef", listing.userRef);
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("listing has been deleted successfully");
  } catch (error) {
    next(error);
  }
};
