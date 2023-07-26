const layout = require("../layout");

module.exports = ({ products }) => {
  const renderedProducts = products
    .map((product) => {
      return `
      <div class="col">
      <div class="card h-100">
      <img src="${product.image}" class="card-img-top h-75" alt="product image">
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">$${product.price}</p>
        <a href="#" class="btn btn-primary">Add to Cart</a>
      </div>
    </div>
    </div>
   `;
    })
    .join("");

  return layout({
    content: `
    <header class="header mb-4 d-flex justify-content-between align-items-center">
      <h1>Ecomm Shop</h1>
      <nav class="d-flex">
        <a href="/" class="nav-link text-primary fs-5 mx-2"><i class="fa-solid fa-star"></i> Products</a>
        <a href="/" class="nav-link text-primary fs-5 mx-2"><i class="fa-solid fa-cart-shopping"></i> Cart</a>
        <a href="/admin/products" class="nav-link text-primary fs-5"><i class="fa-solid fa-user"></i> Admin</a>
      </nav>
    </header>
    <div class="row mb-5">
      <img src="${`/uploads/banner.jpg`}" />
    </div>
    <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
      ${renderedProducts} 
    </div>
    `,
  });
};
