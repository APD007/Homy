import express from "express";
import { Listing } from "../models/listing.js";
import { Review } from "../models/review.js";
import wrapAsync from "../utils/wrapAsync.js";
import validateReview from "../middleware/validateReview.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isReviewAuthor } from "../middleware/isReviewAuthor.js";

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    req.flash("success", "Review Created Successfully!");
    res.redirect(`/listings/${listing._id}`);
  })
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
  })
);

export default router;
