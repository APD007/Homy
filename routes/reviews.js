import express from "express";
import { Listing } from "../models/listing.js";
import { Review } from "../models/review.js";
import wrapAsync from "../utils/wrapAsync.js";
import validateReview from "../middleware/validateReview.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isReviewAuthor } from "../middleware/isReviewAuthor.js";
import { postReview, deleteReview } from "../controllers/review.js";

const router = express.Router({ mergeParams: true });

router.post("/", isLoggedIn, validateReview, wrapAsync(postReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(deleteReview)
);

export default router;
