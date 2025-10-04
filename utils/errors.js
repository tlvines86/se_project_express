const BAD_REQUEST_ERROR_CODE = 400;
const UNAUTHORIZED_ERROR_CODE = 401;
const FORBIDDEN_ERROR_CODE = 403;
const NOT_FOUND_ERROR_CODE = 404;
const CONFLICT_ERROR_CODE = 409;
const INTERNAL_SERVER_ERROR_CODE = 500;

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class BadRequestError extends AppError {
  constructor(message = "Invalid request") {
    super(message, BAD_REQUEST_ERROR_CODE);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, UNAUTHORIZED_ERROR_CODE);
  }
}

class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, FORBIDDEN_ERROR_CODE);
  }
}

class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super(message, NOT_FOUND_ERROR_CODE);
  }
}

class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(message, CONFLICT_ERROR_CODE);
  }
}

class InternalServerError extends AppError {
  constructor(message = "Internal server error") {
    super(message, INTERNAL_SERVER_ERROR_CODE);
  }
}

module.exports = {
  BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  INTERNAL_SERVER_ERROR_CODE,

  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServerError,
};
