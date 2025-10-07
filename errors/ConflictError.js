const AppError = require("./AppError");
const { CONFLICT_ERROR_CODE } = require("./codes");

class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(message, CONFLICT_ERROR_CODE);
  }
}

module.exports = ConflictError;
