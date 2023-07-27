const layout = require("../layout");

module.exports = ({ products }) => {
  const renderedProducts = products
    .map((product) => {
      return `
        <li class="list-group-item">
        <div class="card bg-light">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center w-75 p-2 rounded justify-content-between">
              <p class="card-title fs-3">${product.product.name}</p>
              <p class="card-text fs-4">
                  $${product.product.price * product.quantity}
              </p>
            </div>
            <div>
              <a href="#">
                <i class="fa-solid fa-rectangle-xmark fs-2 bg-white text-danger"></i>
              </a>
            </div>
          </div>
        </div>
        </li>
      `;
    })
    .join("");
  return layout({
    content: `
    <div class="list-group list-group-flush">
        <h3 class="mb-3">Shopping Cart <i class="fa fa-shopping-cart"></i></h3>
        ${renderedProducts}
        <li class="list-group-item">
        <div class="card bg-info">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center w-75 p-2 rounded justify-content-between">
            <p class="card-title fs-3 text-white">Total</p>
          </div>
          <div>
            <button class="btn btn-lg btn-success">
                Buy
            </button>
          </div>
        </div>
      </div>
      </li>
    </div>
    `,
  });
};
