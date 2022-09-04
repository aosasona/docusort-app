class ValidationError extends Error {
  status: number;
  message: string;

  constructor(message: string = "") {
	super(message);
	this.name = "ValidationError";
	this.message = message;
  }
}

export default ValidationError