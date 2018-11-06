const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email type";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Please enter email address";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Please type password";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
