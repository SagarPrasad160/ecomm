const { getError } = require("../helpers");

const layout = require("../layout");

module.exports = ({ product, errors }) => {
  return layout({
    content: `
    <form method="POST" id="productEditForm" class="mx-5"  enctype="multipart/form-data">
    <div class="mb-3">
      <label for="name" class="form-label">Product Name</label>
      <input type="text" name="name" class="form-control" placeholder="Product name" id="name" value="${
        product.name
      }"/>
      <p class="text-danger">${getError(errors, "name")}</p>
    </div>
    
    <div class="mb-3">
    <label for="price" class="form-label">Product Name</label>
    <input type="number" name="price" class="form-control" placeholder="Price" id="price" value="${
      product.price
    }"  />
    <p class="text-danger">${getError(errors, "price")}</p>
    </div>
    <div class="mb-3">
      <label for="imageInput" class="form-label">Select Image</label>
      <input type="file" class="form-control" name="image" id="imageInput" accept="image/*" />
      <p class="text-danger">${getError(errors, "image")}</p>
    </div>
    <button class="btn btn-primary" type="submit">Edit Product</button>
    </form>
    `,
  });
};
