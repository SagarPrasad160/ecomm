const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

const { validationResult } = require("express-validator");
const { requireName, requirePrice, requireImageSrc } = require("../validators");
const { requireAuth, handleErrors } = require("../middleware/handleErrors");

const newProductTemplate = require("../views/admin/new");
const productsListTemplate = require("../views/admin/show");
const adminPanelTemplate = require("../views/admin/products");
const productEditTemplate = require("../views/admin/edit");

const { uploadProductImage } = require("../middleware/uploadProductImage");

router.get("/admin/products", requireAuth, async (req, res) => {
  const products = await Product.find({});
  res.status(200).send(adminPanelTemplate({ products }));
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
      return res.status(404).send({ success: false, data: errors.array() });
    }

    const { name, price } = req.body;
    let image;

    if (req.files && req.files.image) {
      // If there is an uploaded image, use the uploadProductImage function to get the image URL
      try {
        image = await uploadProductImage(req, res);
      } catch (error) {
        console.error(error);
        return res.status(500).send("Error uploading image");
      }
    }

    let product = new Product({
      name,
      price,
      image, // Use the image URL obtained from Cloudinary
    });

    try {
      product = await product.save();
      res.redirect("/admin/products");
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
    const { name, price } = req.body;
    product.name = name;
    product.price = price;
    if (req.files && req.files.image) {
      // If there is an uploaded image, use the uploadProductImage function to get the image URL
      try {
        image = await uploadProductImage(req, res);
        product.image = image;
      } catch (error) {
        console.error(error);
        return res.status(500).send("Error uploading image");
      }
    }
    try {
      product = await product.save();
      res.redirect("/admin/products");
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong");
    }
  }
);

router.get("/admin/products/edit/:id", requireAuth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.send(productEditTemplate({ product }));
});

router.post("/admin/products/:id/delete", requireAuth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/admin/products");
});

module.exports = router;
