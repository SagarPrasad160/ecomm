const express = require("express");
const router = express.Router();

const { requireName, requirePrice, requireImageSrc } = require("../validators");
const { validationResult } = require("express-validator");

const Product = require("../models/Product");
const { requireAuth, handleErrors } = require("../middleware/handleErrors");

const newProductTemplate = require("../views/admin/new");
const productsListTemplate = require("../views/admin/show");
const adminProductListTemplate = require("../views/admin/products");
const productEditTemplate = require("../views/admin/edit");

router.get("/admin/products", requireAuth, async (req, res) => {
  const products = await Product.find({});
  res.status(200).send(adminProductListTemplate({ products }));
});

router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.status(200).send(productsListTemplate({ products }));
});

router.post(
  "/admin/products/new",
  requireAuth,
  [requireName, requirePrice, requireImageSrc],
  handleErrors(newProductTemplate),
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

router.post(
  "/admin/products/edit/:id",
  requireAuth,
  [requireName, requirePrice],
  handleErrors(productEditTemplate, async (req) => {
    const product = await Product.findById(req.params.id);
    return { product };
  }),
  async (req, res) => {
    let product = await Product.findById(req.params.id);
    let upadtedProduct = {};
    const { name, price, image } = req.body;
    if (name) upadtedProduct.name = name;
    if (price) upadtedProduct.price = price;
    if (image) upadtedProduct.image = image;

    product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: upadtedProduct,
      },
      { new: true }
    );
    res.send({ success: true, data: product });
  }
);

router.get("/admin/products/edit/:id", requireAuth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.send(productEditTemplate({ product }));
});

module.exports = router;
