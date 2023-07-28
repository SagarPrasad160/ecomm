const fs = require("fs");
const cloudinary = require("cloudinary").v2;

const uploadProductImage = async (req, res, next) => {
  try {
    if (!req.files || !req.files.image) {
      throw { message: "Please upload an image" };
    }

    const image = req.files.image;

    if (!image.mimetype.startsWith("image")) {
      throw { message: "Please upload an image file" };
    }

    if (image.size > 1024 * 1024) {
      throw { message: "File size should be less than 1 MB" };
    }

    const result = await cloudinary.uploader.upload(image.tempFilePath, {
      use_filename: true,
      folder: "file-upload",
    });
    fs.unlinkSync(image.tempFilePath);

    // Store the uploaded image URL in the request object
    req.body.image = result.secure_url;

    // Continue to the next middleware
    next();
  } catch (error) {
    // Store the error object in the request object
    req.uploadedImageError = error;

    // Continue to the next middleware
    next();
  }
};

module.exports = {
  uploadProductImage,
};
