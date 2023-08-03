const layout = require("../layout");

module.exports = ({ products }) => {
  const renderedProducts = products
    .map((product, i) => {
      return `
        <tr>
          <td class="fw-bold">${product.name}</td>
          <td>$${product.price}</td>
          <td><a href="/admin/products/edit/${product._id}" class="btn btn-primary">Edit</a></td>
          <td>
            <form method="POST" action="/admin/products/${product._id}/delete">
                <button class="btn btn-danger">Delete</button>
            </form>
          </td>
        </tr>
      `;
    })
    .join("");

  return layout({
    content: `
        <h1 class="mb-4">Admin Panel</h1>
        <header class="d-flex justify-content-between mb-4">
          <h2>Products</h2>
          <ul class="nav d-flex justify-content-center">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/signout">Signout</a>
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
    `,
  });
};
