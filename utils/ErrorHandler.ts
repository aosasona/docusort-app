import ValidationError from "../src/errors/ValidationError";

export const handleError = (error: Error | ValidationError) => {
  if (error instanceof ValidationError) {
	return error.message
  } else {
	return "Something went wrong!"
  }
}