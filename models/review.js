import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  comment: {
    type: String,
    // required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    // required:true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Review =
  mongoose.models.Review || mongoose.model("Review", reviewSchema);
