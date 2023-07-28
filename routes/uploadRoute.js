const express = require("express");
const router = express.Router();

const fs = require("fs");

const cloudinary = require("cloudinary").v2;

// router.post("/admin/products/uploads", async (req, res) => {
//   const productImage = req.files.image;

//   const imagePath = path.resolve(
//     __dirname,
//     "../public/uploads/" + `${productImage.name}`
//   );

//   await productImage.mv(imagePath);

//   res.status(200).send({ image: { src: `/uploads/${productImage.name}` } });
// });

const uploadProductImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        use_filename: true,
        folder: "file-upload",
      }
    );
    fs.unlinkSync(req.files.image.tempFilePath);
    return res.status(200).json({ image: { src: result.secure_url } });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

router.route("/admin/products/uploads").post(uploadProductImage);

module.exports = router;
