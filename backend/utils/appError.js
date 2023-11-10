// class AppError extends Error {
//   constructor(message, statusCode) {
//     super(message);

//     this.statusCode = statusCode;
//     this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
//     this.isOperational = true;

//     Error.captureStackTrace(this, this.constructor);
//   }
// }

class AppError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.code = errorCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
