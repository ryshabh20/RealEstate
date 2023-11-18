export const errorHandler = (statusCode, message) => {
  const error = new Error(message);
  console.log(error);
  error.statusCode = statusCode;
  error.message = message;

  return error;
};
