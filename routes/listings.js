import express from "express";
import { Listing } from "../models/listing.js";
import wrapAsync from "../utils/wrapAsync.js";
import { isLoggedIn, saveRedirectUrl } from "../middleware/isLoggedIn.js";
import isOwner from "../middleware/isOwner.js";
import validateListing from "../middleware/validateListing.js";
import {
  index,
  renderNewForm,
  showForm,
  createForm,
  editForm,
  updateForm,
  deleteForm,
} from "../controllers/listing.js";
import multer from "multer";
import { storage } from "../cloudinary/index.js";
const upload = multer({ storage });

const router = express.Router();

router.get("/", wrapAsync(index));

router.get("/new", isLoggedIn, renderNewForm);

router.get("/:id", wrapAsync(showForm));

router.post("/", isLoggedIn, upload.single("image"), wrapAsync(createForm));

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(editForm)
);

router.put("/:id", isLoggedIn, isOwner, upload.single("image"),validateListing, wrapAsync(updateForm));

router.delete("/:id", isLoggedIn, isOwner, wrapAsync(deleteForm));

export default router;
