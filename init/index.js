// index.js
import mongoose from "mongoose";
import { Listing } from "../models/listing.js";
import { sampleListings } from "./data.js"; 

async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/homy");
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    await Listing.insertMany(sampleListings);
    console.log("✅ Sample listings initialized");
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to initialize data:", err);
    process.exit(1);
  }
};

connectDB().then(initDB);
