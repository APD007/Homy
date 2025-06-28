import Joi from "joi";
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  comment: {
    type: String,
    // required: true,
  },
  rating: {
    type: Number,
    min :1,
    max:5,
    // required:true,
  },
  createdAt:{
    type:Date,
    default: Date.now()
  }
});

export const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);
