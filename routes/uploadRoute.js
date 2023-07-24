const express = require("express");
const router = express.Router();

const path = require("path");

router.post("/admin/products/uploads", async (req, res) => {
  const productImage = req.files.image;

  const imagePath = path.resolve(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );

  await productImage.mv(imagePath);

  res.status(200).send({ image: { src: `/uploads/${productImage.name}` } });
});

module.exports = router;
