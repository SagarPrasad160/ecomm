require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

const Product = require("./models/Product");

const { validationResult } = require("express-validator");
const {
  requireName,
  requirePrice,
  requireImageSrc,
} = require("./middleware/validators");

const connect = require("./config/db");

const fileUpload = require("express-fileupload");

// Connect db
connect();
// use body parser middleware
app.use(express.json());
app.use(fileUpload());

// serve static assets
app.use(express.static("./public"));

const PORT = process.env.PORT || 5000;

app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.status(200).send({ products });
});

app.post(
  "/api/products",
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

app.post("/api/products/uploads", async (req, res) => {
  const productImage = req.files.image;

  const imagePath = path.resolve(
    __dirname,
    "./public/uploads/" + `${productImage.name}`
  );

  console.log(imagePath);

  await productImage.mv(imagePath);

  res.status(200).send({ image: { src: `/uploads/${productImage.name}` } });
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
