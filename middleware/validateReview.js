import reviewSchema from "../utils/validateReview.js";
import ExpressError from "../utils/ExpressError.js";
import { Listing } from "../models/listing.js";
import { Review } from "../models/review.js";


const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

export default validateReview;
