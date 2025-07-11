import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});

userSchema.plugin(passportLocalMongoose);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
