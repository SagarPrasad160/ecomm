require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const Product = require("./models/Product");

const { validationResult } = require("express-validator");
const { handleErrors } = require("./middleware/handleErrors");

const signupTemplate = require("./views/admin/signup");

const {
  requireName,
  requirePrice,
  requireImageSrc,
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
} = require("./validators");

const connect = require("./config/db");

const fileUpload = require("express-fileupload");

// Connect db
connect();
app.use(express.json());
// use body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
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

app.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordConfirmation],
  handleErrors(signupTemplate),
  (req, res) => {
    const { email, password, confirmPassword } = req.body;
    console.log(email, password, confirmPassword);
    res.send({ email, password });
  }
);

app.get("/signup", (req, res) => {
  res.send(signupTemplate({}));
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
