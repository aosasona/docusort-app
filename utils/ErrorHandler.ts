import AppError from "../src/errors/AppError";
import ValidationError from "../src/errors/ValidationError";

export const handleError = (error: Error | ValidationError | AppError) => {
  if (error instanceof ValidationError || error instanceof AppError) {
	return error.message
  } else {
	return "Something went wrong!"
  }
}