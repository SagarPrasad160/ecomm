const fs = require("fs");
const cloudinary = require("cloudinary").v2;

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
    return result.secure_url; // Return the secure URL of the uploaded image
  } catch (error) {
    console.log(error);
    throw new Error("Error uploading image to Cloudinary");
  }
};

module.exports = {
  uploadProductImage,
};
