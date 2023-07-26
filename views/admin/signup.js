const { getError } = require("../helpers.js");

const layout = require("../layout.js");

module.exports = ({ errors }) => {
  return layout({
    content: `
      <form method="POST">
      <div class="mb-3">
        <label class="form-label" for="email">Email</label>
        <input  type="email" class="form-control" placeholder="email" id="email" name="email" />
        <p class="text-danger">${getError(errors, "email")}</p>
      </div>
      <div class="mb-3">
        <label class="form-label" id="password">Password</label>
        <input class="form-control" type="password" placeholder="password" id="password" name="password" />
        <p class="text-danger">${getError(errors, "password")}</p>
      </div>
      <div class="mb-3">
        <label class="form-label" for="confirmPassword">Confirm Password</label>
        <input type="password" class="form-control" placeholder="confirm password" id="confirmPassword" name="confirmPassword" />
        <p class="text-danger">${getError(errors, "confirmPassword")}</p>
      </div>
      <div class="mb-3">
      <button type="submit" class="btn btn-success">Sign Up</button>
      </div>
      <a href="/signin" class="text-primary">Already have account, sign-in instead</a>
      </form>
        `,
  });
};
