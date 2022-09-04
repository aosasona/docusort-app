export const signupSchema = {
  firstName: {
	presence: true,
	length: {
	  minimum: 3,
	  maximum: 30,
	},
  },
  lastName: {
	presence: true,
	length: {
	  minimum: 3,
	  maximum: 30,
	},
  },
  email: {
	presence: true,
	email: true,
  },
  password: {
	presence: true,
	length: {
	  minimum: 6,
	  maximum: 20,
	},
  },
  confirmPassword: {
	presence: true,
	length: {
	  minimum: 6,
	  maximum: 20,
	},
	equality: "password",
  },
}

export const signinSchema = {
  email: {
	presence: true,
	email: true,
  },
  password: {
	presence: true,
	length: {
	  minimum: 6,
	  maximum: 20,
	},
  },
}