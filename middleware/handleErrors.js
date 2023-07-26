const { validationResult } = require("express-validator");

module.exports = {
  handleErrors(templateFunc, callbackFn) {
    return async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let data = {};
        if (callbackFn) {
          data = await callbackFn(req);
        }
        return res.send(templateFunc({ errors, ...data }));
      }
      next();
    };
  },
  requireAuth(req, res, next) {
    if (!req.session.userId) {
      return res.redirect("/signin");
    }
    next();
  },
};
