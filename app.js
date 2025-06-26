import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { Listing } from "./models/listing.js";
import { sampleListings } from "./init/data.js"; 
import methodOverride from "method-override";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
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

//Index Route
app.get("/", async (req, res) => {
  res.render("working");
});

app.get("/listings", async (req, res) => {
    try {
        const listings = await Listing.find({});
        res.render("listings/index", { listings }); // Assuming you have views/listings/index.ejs
    } catch (err) {
        console.error("Error fetching listings:", err);
        res.status(500).send("Something went wrong!");
    }
});

app.get("/listings/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).send("Listing not found");
        }
        res.render("listings/show", { listing });
    } catch (err) {
        console.error("Error fetching listing:", err);
        res.status(500).send("Something went wrong!");
    }
});


connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
});
