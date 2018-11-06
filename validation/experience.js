const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Experience title must not be empty";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Company name must not be empty";
  }
  if (Validator.isEmpty(data.location)) {
    errors.location = "Location must not be empty";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "from date must not be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
