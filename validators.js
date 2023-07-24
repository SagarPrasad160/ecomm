const { check } = require("express-validator");

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
    .withMessage("Must be a valid email"),
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
};
