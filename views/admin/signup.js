const { getError } = require("../helpers.js");

module.exports = ({ errors }) => {
  return `
  <form method="POST">
  <input required type="email" placeholder="email" name="email" />
  <p>${getError(errors, "email")}</p>
  <input required type="password" placeholder="password" name="password" />
  <p>${getError(errors, "password")}</p>
  <input required type="password" placeholder="confirm password" name="confirmPassword" />
  <p>${getError(errors, "confirmPassword")}</p>
  <button type="submit">Submit</button>
  </form>
    `;
};
