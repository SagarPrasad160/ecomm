const { check } = require("express-validator");

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
};
