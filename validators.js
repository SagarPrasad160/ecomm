const { check } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

module.exports = {
  requireName: check("name")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Name should atleast of 5 characters"),
  requirePrice: check("price")
    .trim()
    .toFloat()
    .isFloat({ min: 1 })
    .withMessage("Value must be greater than 1"),
  requireImageSrc: check("image")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Please provide an Image"),
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email")
    .custom(async (email) => {
      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new Error("Email already in use");
      }
    }),
  requirePassword: check("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 chars"),
  requirePasswordConfirmation: check("confirmPassword")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 chars")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("Passwords must match");
      } else {
        return true;
      }
    }),
  requireEmailExists: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid Email")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Email does not exists");
      }
      return true;
    }),
  requirePasswordsMatch: check("password")
    .trim()
    .custom(async (password, { req }) => {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw new Error("user does not exits");
      }
      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        throw new Error("Invalid Password");
      }
      return true;
    }),
};
