interface ErrorParams {
  message: string;
  statusCode: number;
};

export class HttpError extends Error {
  message;
  statusCode;

  constructor({ message, statusCode }:ErrorParams) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}