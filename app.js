import express from "express";
import path from "path";
import ejsMate from "ejs-mate";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { Listing } from "./models/listing.js";
import { sampleListings } from "./init/data.js"; 
import methodOverride from "method-override";



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

app.get("/", async (req, res) => {
  res.render("working");
});

//INDEX ROUTE
app.get("/listings", async (req, res) => {
    try {
        const listings = await Listing.find({});
        res.render("listings/index", { listings }); 
    } catch (err) {
        console.error("Error fetching listings:", err);
        res.status(500).send("Something went wrong!");
    }
});

//NEW ROUTE
app.get("/listings/new", (req, res) => {
  res.render("listings/new");
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

app.post("/listings", async (req, res) => {
  try {
    const listing = new Listing(req.body.listing); 
    await listing.save();
    res.redirect("/listings");
  } catch (err) {
    console.error("Failed to create listing:", err);
    res.status(500).send("Error creating listing.");
  }
});


//EDIT ROUTE
app.get("/listings/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
  } catch (err) {
    console.error("Error loading edit form:", err);
    res.status(500).send("Error loading edit form");
  }
});

app.put("/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.redirect(`/listings/${updatedListing._id}`);
  } catch (err) {
    console.error("Error updating listing:", err);
    res.status(500).send("Update failed");
  }
});

// DELETE route
app.delete("/listings/:id", async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.redirect("/listings");
  } catch (err) {
    console.error("❌ Error deleting listing:", err);
    res.status(500).send("Something went wrong!");
  }
});



connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
});
