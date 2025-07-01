import express from "express";
import passport from "passport";
import { User } from "../models/user.js";
import wrapAsync from "../utils/wrapAsync.js";
import { isLoggedIn, saveRedirectUrl } from "../middleware/isLoggedIn.js";
import {
  renderSignup,
  signUp,
  renderLogin,
  successLogin,
  logOut,
} from "../controllers/user.js";

const router = express.Router();

router.get("/signup", renderSignup);

router.post("/signup", wrapAsync(signUp));

router.get("/login", renderLogin);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  successLogin
);

router.get("/logout", logOut);

export default router;
