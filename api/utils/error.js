export const errorHandler = (statusCode, message) => {
  console.log("hey");
  const error = new Error(message);
  error.statusCode = statusCode;
  error.message = message;

  return error;
};
