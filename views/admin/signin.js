const { getError } = require("../helpers");

const layout = require("../layout");

module.exports = ({ errors }) => {
  return layout({
    content: `
    <form method="POST" class="mx-5">
    <div class="mb-3">
      <label class="form-label" for="email">Email</label>
      <input  type="email" class="form-control" placeholder="email" id="email" name="email" />
      <p class="text-danger">${getError(errors, "email")}</p>
    </div>
    <div class="mb-3">
      <label class="form-label" for="password">Password</label>
      <input type="password" class="form-control" placeholder="password" id="password" name="password" />
      <p class="text-danger">${getError(errors, "password")}</p>
    </div>
    <div class="mb-3">
      <button type="submit" class="btn btn-success">Sign In</button>
    </div>
    <a href="/signup" class="text-primary">Register for an account</a>
    </form>
      `,
  });
};
