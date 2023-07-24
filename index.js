require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const bcrypt = require("bcryptjs");

const Product = require("./models/Product");
const User = require("./models/User");

const { validationResult } = require("express-validator");
const { handleErrors } = require("./middleware/handleErrors");

const signupTemplate = require("./views/admin/signup");
const signinTemplate = require("./views/admin/signin");

const {
  requireName,
  requirePrice,
  requireImageSrc,
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireEmailExists,
  requirePasswordsMatch,
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
// cookie session
app.use(
  cookieSession({
    keys: ["afdasfasf"],
  })
);

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

app.get("/signup", (req, res) => {
  res.send(signupTemplate({}));
});

app.post(
  "/signin",
  [requireEmailExists, requirePasswordsMatch],
  handleErrors(signinTemplate),
  async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      req.session.userId = user._id;
      res.send(req.session);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
);

app.get("/signin", (req, res) => {
  res.send(signinTemplate({}));
});

app.get("/signout", (req, res) => {
  req.session = null;
  res.send("Signed out successfully!");
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
