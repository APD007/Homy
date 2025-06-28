import { listingSchema } from "../utils/validateListing.js";
import ExpressError from "../utils/ExpressError.js";

const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    // console.log(msg);
    throw new ExpressError(msg, 400);
  }
  next();
};

export default validateListing;
