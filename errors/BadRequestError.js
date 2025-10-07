const AppError = require("./AppError");
const { BAD_REQUEST_ERROR_CODE } = require("./codes");

class BadRequestError extends AppError {
  constructor(message = "Invalid request") {
    super(message, BAD_REQUEST_ERROR_CODE);
  }
}

module.exports = BadRequestError;
