const AppError = require("./AppError");
const { FORBIDDEN_ERROR_CODE } = require("./codes");

class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, FORBIDDEN_ERROR_CODE);
  }
}

module.exports = ForbiddenError;
