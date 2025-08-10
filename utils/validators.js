const validator = require("validator");

function isValidUrl(value) {
  return validator.isURL(value);
}

module.exports = { isValidUrl };
