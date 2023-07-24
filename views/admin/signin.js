const { getError } = require("../helpers");

module.exports = ({ errors }) => {
  return `
  <form method="POST">
  <input required type="email" placeholder="email" name="email" />
  <p>${getError(errors, "email")}</p>
  <input required type="password" placeholder="password" name="password" />
  <p>${getError(errors, "password")}</p>
  <button type="submit">Sign In</button>
  </form>
    `;
};
