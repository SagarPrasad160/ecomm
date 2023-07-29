const express = require("express");
const router = express.Router();

const User = require("../models/User");

const { handleErrors } = require("../middleware/handleErrors");
const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireEmailExists,
  requirePasswordsMatch,
} = require("../validators");
const bcrypt = require("bcryptjs");

const signupTemplate = require("../views/admin/signup");
const signinTemplate = require("../views/admin/signin");

router.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordConfirmation],
  handleErrors(signupTemplate),
  async (req, res) => {
    const { email, password } = req.body;
    let user = new User({
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    try {
      user = await user.save();
      req.session.userId = user._id;
      res.status(200).send(req.session);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/signup", (req, res) => {
  res.send(signupTemplate({}));
});

router.post(
  "/signin",
  [requireEmailExists, requirePasswordsMatch],
  handleErrors(signinTemplate),
  async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      req.session.userId = user._id;
      res.redirect("/admin/products");
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/signin", (req, res) => {
  if (req.session.userId) {
    return res.redirect("/admin/products");
  }
  res.send(signinTemplate({}));
});

router.get("/signout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

module.exports = router;
