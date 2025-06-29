import express from "express";
import { Listing } from "../models/listing.js";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/ExpressError.js";
import validateListing from "../middleware/validateListing.js";
const router = express.Router();

router.get(
  "/",
  wrapAsync(async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index", { listings });
  })
);

// NEW - Show form
router.get("/new", (req, res) => {
  res.render("listings/new");
});

// SHOW - Show one listing
router.get(
  "/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist");
      return res.redirect("/listings");
    }
    res.render("listings/show", { listing });
  })
);

// CREATE - Create new listing


router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res) => {
    const listing = new Listing(req.body.listing);
    await listing.save();
    req.flash("success", "New Listing created successfully!");
    res.redirect("/listings");
  })
);


//SHOW
router.get(
  "/:id/edit",validateListing,
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist");
      return res.redirect("/listings");
    }
    res.render("listings/edit", { listing });
  })
);

// UPDATE - Update listing
router.put(
  "/:id",validateListing,
  wrapAsync(async (req, res, next) => {
    console.log("BODY:", req.body);
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, {
      new: true,
      runValidators: true,
    });
    req.flash("success", "Listing Updated Successfully!");
    res.redirect(`/listings/${updatedListing._id}`);
  })
);

// DELETE - Delete listing
router.delete(
  "/:id",
  wrapAsync(async (req, res, next) => {
    await Listing.findByIdAndDelete(req.params.id);
    req.flash("success", "Listing Deleted Successfully!");
    res.redirect("/listings");
  })
);

export default router;
