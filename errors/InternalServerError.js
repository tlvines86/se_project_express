const AppError = require("./AppError");
const { INTERNAL_SERVER_ERROR_CODE } = require("./codes");

class InternalServerError extends AppError {
  constructor(message = "Internal server error") {
    super(message, INTERNAL_SERVER_ERROR_CODE);
  }
}

module.exports = InternalServerError;
