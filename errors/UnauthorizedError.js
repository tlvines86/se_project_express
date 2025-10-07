const AppError = require("./AppError");
const { UNAUTHORIZED_ERROR_CODE } = require("./codes");

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, UNAUTHORIZED_ERROR_CODE);
  }
}

module.exports = UnauthorizedError;
