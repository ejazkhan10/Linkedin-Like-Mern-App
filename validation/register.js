const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function ValidateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email type";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Please input a name";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Please input an email";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Please input a password";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Please input confirm password";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  if (!Validator.isLength(data.password, { min: 2, max: 30 })) {
    errors.password = "Password must be between 2 and 30 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
