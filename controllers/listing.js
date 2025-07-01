import { Listing } from "../models/listing.js";

export const index = async (req, res) => {
  const listings = await Listing.find({}).populate("owner");
  res.render("listings/index", { listings });
};

export const renderNewForm = (req, res) => {
  res.render("listings/new");
};

export const showForm = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/show", { listing });
};

export const createForm = async (req, res) => {
  const listing = new Listing(req.body.listing);
  listing.owner = req.user._id;
  listing.image = {
    url: req.file.path,
    filename: req.file.filename,
  };

  await listing.save();
  req.flash("success", "New Listing created successfully!");
  res.redirect("/listings");
};

export const editForm = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
  res.render("listings/edit", { listing,originalImageUrl });
};

export const updateForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  listing.title = req.body.listing.title;
  listing.description = req.body.listing.description;
  listing.price = req.body.listing.price;
  listing.location = req.body.listing.location;
  listing.country = req.body.listing.country;
  if (req.file) {
    listing.image.url = req.file.path;
    listing.image.filename = req.file.filename;
  }

  await listing.save();
  req.flash("success", "Listing Updated Successfully!");
  res.redirect(`/listings/${listing._id}`);
};

export const deleteForm = async (req, res, next) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("success", "Listing Deleted Successfully!");
  res.redirect("/listings");
};
