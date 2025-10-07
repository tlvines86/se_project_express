const AppError = require("./AppError");
const { NOT_FOUND_ERROR_CODE } = require("./codes");

class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super(message, NOT_FOUND_ERROR_CODE);
  }
}

module.exports = NotFoundError;
