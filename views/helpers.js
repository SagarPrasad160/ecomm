module.exports = {
  getError: (errors, prop) => {
    try {
      const error = errors.mapped()[prop].msg;
      return error;
    } catch (error) {
      return "";
    }
  },
};
