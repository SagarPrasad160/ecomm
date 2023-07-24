const express = require("express");
const router = express.Router();

const { requireName, requirePrice, requireImageSrc } = require("../validators");
const { validationResult } = require("express-validator");

const Product = require("../models/Product");
const { requireAuth } = require("../middleware/handleErrors");

const newProductTemplate = require("../views/admin/new");

router.get("/admin/products", requireAuth, async (req, res) => {
  const products = await Product.find({});
  res.status(200).send({ products });
});

router.post(
  "/admin/products/new",
  requireAuth,
  [requireName, requirePrice, requireImageSrc],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).send({ success: "false", data: errors.array() });
    }

    const { name, price, image } = req.body;
    let product = new Product({
      name,
      price,
      image,
    });
    try {
      product = await product.save();
      res.send({ success: true, data: product });
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong");
    }
  }
);

router.get("/admin/products/new", requireAuth, (req, res) => {
  res.send(newProductTemplate({}));
});

module.exports = router;
