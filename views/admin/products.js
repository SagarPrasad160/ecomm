const layout = require("../layout");

module.exports = ({ products }) => {
  const renderedProducts = products
    .map((product, i) => {
      return `
        <tr>
          <td class="fw-bold">${product.name}</td>
          <td>$${product.price}</td>
          <td><button class="btn btn-primary">Edit</button></td>
          <td><button class="btn btn-danger">Delete</button></td>
        </tr>
      `;
    })
    .join("");

  return layout({
    content: `
      <div>
        <h1 class="mb-4">Admin Panel</h1>
        <header class="d-flex justify-content-between mb-4">
          <h2>Products</h2>
          <ul class="nav justify-content-center">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="">Products</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/admin/products/new">New Product</a>
            </li>
          </ul>
        </header>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            ${renderedProducts}
          </tbody>
        </table>
      </div>
    `,
  });
};
