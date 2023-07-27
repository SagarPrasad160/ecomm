const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");
const Product = require("../models/Product");

const cartTemplate = require("../views/cart/cart");

router.get("/cart", async (req, res) => {
  if (!req.session.cartId) {
    return res.redirect("/");
  }
  // send all the products in the template to show to the
  try {
    const cart = await Cart.findById(req.session.cartId);
    // send the products from productIds array
    const { products } = cart;
    let data = [];
    for (let record of products) {
      const product = await Product.findById(record.productId);
      data.push({
        product,
        quantity: record.quantity,
      });
    }
    res.send(cartTemplate({ products: data }));
  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
});

router.post("/cart", async (req, res) => {
  const { productId } = req.body;

  try {
    let cart;

    // Check if a cart exists by looking up the cartId in the session
    if (!req.session.cartId) {
      // If cartId doesn't exist, create a new cart
      cart = new Cart({ products: [] });
      await cart.save();
      req.session.cartId = cart._id;
    } else {
      // If cartId exists, fetch the cart from the database
      cart = await Cart.findById(req.session.cartId);
    }

    // Check if the product with the given productId already exists in the cart
    const existingProduct = cart.products.find(
      (product) => product.productId.toString() === productId
    );

    if (existingProduct) {
      // If the product exists, increment its quantity by 1
      existingProduct.quantity += 1;
    } else {
      // If the product doesn't exist, add it to the products array with quantity 1
      cart.products.push({ productId, quantity: 1 });
    }

    // Save the updated cart in the database
    await cart.save();

    res.redirect("/cart");
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error: "Something went wrong" });
  }
});
router.post("/cart/:productId", async (req, res) => {
  if (!req.session.cartId) {
    return res.redirect("/");
  }
  const productId = req.params.productId;
  let cart = await Cart.findById(req.session.cartId);
  // Find the product with productId in the products array of the cart
  const { products } = cart;

  const updatedProducts = products.map((product) => {
    if (product.productId.toString() === productId) {
      // If the product is found in the cart, check its quantity
      if (product.quantity > 1) {
        // If the quantity is greater than 1, decrement the quantity by 1
        return { ...product, quantity: product.quantity - 1 };
      } else {
        // If the quantity is 1, exclude the product from the updated array
        return null;
      }
    }
    return product;
  });

  // Filter out null values from the updatedProducts array
  const filteredProducts = updatedProducts.filter(
    (product) => product !== null
  );

  // Update the cart's products array with the filteredProducts
  cart.products = filteredProducts;

  // Save the updated cart in the database
  await cart.save();

  res.redirect("/cart");
});

module.exports = router;
