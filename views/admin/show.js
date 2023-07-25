const layout = require("../layout");

module.exports = ({ products }) => {
  return layout({
    content: products
      .map((product) => {
        return `
          <div class="card">
          <img src="${product.image}" class="card-img-top h-75" alt="product image">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">$${product.price}</p>
            <a href="#" class="btn btn-primary">Add to Cart</a>
          </div>
        </div>
       `;
      })
      .join(""),
  });
};
