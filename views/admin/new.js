const { getError } = require("../helpers");

const layout = require("../layout");

module.exports = ({ errors }) => {
  return layout({
    content: `
    <form method="POST" id="productForm">
    <input type="text" name="name" placeholder="product name" id="name" required />
    <p>${getError(errors, "name")}</p>
    <input type="number" name="price" placeholder="price" id="price" required  />
    <p>${getError(errors, "price")}</p>
    <input type="file" name="image" id="imageInput" />
    <p>${getError(errors, "image")}</p>
    <button type="submit">Add</button>
    </form>
    `,
  });
};
