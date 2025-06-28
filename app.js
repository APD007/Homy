import express from "express";
import path from "path";
import ejsMate from "ejs-mate";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { Listing } from "./models/listing.js";
import { Review } from "./models/review.js";
import { sampleListings } from "./init/data.js"; 
import methodOverride from "method-override";
import wrapAsync from "./utils/wrapAsync.js";
import ExpressError from "./utils/ExpressError.js";
import validateListing from "./middleware/validateListing.js";
import validateReview from "./middleware/validateReview.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.engine("ejs", ejsMate);
const port = 3000;

app.use(express.static(path.join(__dirname, "public/js")));
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/homy");
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}
// Routes
app.get("/", (req, res) => {
  res.render("working");
});

// INDEX - Show all listings
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index", { listings });
  })
);

// NEW - Show form
app.get("/listings/new", (req, res) => {
  res.render("listings/new");
});

// SHOW - Show one listing
app.get(
  "/listings/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
      throw new ExpressError("Listing not found", 404);
    }
    res.render("listings/show", { listing });
  })
);

// CREATE - Create new listing


app.post(
  "/listings",
  validateListing,
  wrapAsync(async (req, res) => {
    const listing = new Listing(req.body.listing);
    await listing.save();
    res.redirect("/listings");
  })
);


// EDIT - Show edit form
app.get(
  "/listings/:id/edit",validateListing,
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      throw new ExpressError("Listing not found", 404);
    }
    res.render("listings/edit", { listing });
  })
);

// UPDATE - Update listing
app.put(
  "/listings/:id",validateListing,
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, {
      new: true,
      runValidators: true,
    });
    res.redirect(`/listings/${updatedListing._id}`);
  })
);

// DELETE - Delete listing
app.delete(
  "/listings/:id",
  wrapAsync(async (req, res, next) => {
    await Listing.findByIdAndDelete(req.params.id);
    res.redirect("/listings");
  })
);

//post route
app.post(
  "/listings/:id/reviews",
  validateReview,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    console.log(req.body);
    const review = new Review(req.body.review);
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
  })
);

app.delete(
  "/listings/:id/reviews/:reviewId",
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
  })
);

// Catch-all 404 handler
app.use((req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// Global error handler
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong!";
  res.status(statusCode).render("error", { err });
});


// Start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
});