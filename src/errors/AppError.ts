class AppError extends Error {
  status: number;
  message: string;

  constructor(message: string = "") {
	super(message);
	this.name = "AppError";
	this.message = message;
  }
}

export default AppError