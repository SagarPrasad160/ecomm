const layout = require("../layout");

module.exports = ({ products }) => {
  const renderedProducts = products
    .map((product) => {
      return `
        <div class="card bg-light mb-3">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center w-75 p-2 rounded justify-content-between">
              <p class="card-title fs-3">${product.product.name}</p>
              <p class="card-text fs-4">
                  $${product.product.price * product.quantity}
              </p>
            </div>
            <div>
              <form method="POST" action="/cart/${product.product._id}">
                <button class="btn btn-danger" type="submit">
                  <i class="fas fa-times"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
  const productTotal = products.reduce((acc, curr) => {
    return acc + curr.product.price;
  }, 0);
  return layout({
    content: `
    <h3 class="mb-3">Shopping Cart <i class="fa fa-shopping-cart"></i></h3>
    <div class="row row-cols-1 row-cols-md-2">
      <div class="col">
        ${renderedProducts}
      </div>
      <div class="col">
        <div class="card bg-info">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center w-75 p-2 rounded justify-content-between">
              <p class="card-title fs-3 text-white">Total: $${productTotal}</p>
            </div>
            <div>
              <button class="btn btn-lg btn-success">
                Buy
              </button>
            </div>
          </div>
        </div>
        <div class="mt-3">
          <div class="d-flex gap-1">
            <div class="d-grid col-6">
              <a href="/" class="btn btn-outline-secondary">Back to Home</a>
            </div>
            <div class="d-grid col-6"> 
              <a href="" class="btn btn-outline-secondary">
                Add Payment Method
              </a>
            </div>
          </div>
        </div>
    </div>
    `,
  });
};
