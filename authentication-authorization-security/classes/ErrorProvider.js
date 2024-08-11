// * Inheritance the Error class for providing special error messages that users can understand
class ErrorProvider extends Error {
  constructor(statusCode, status, message) {
    // * Inherit message field from Super Class (Error)
    super(message);

    this.statusCode = statusCode;
    this.status = status;

  
    // * Eror stack
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorProvider;
