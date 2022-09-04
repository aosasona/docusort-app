import validation from 'validate.js'

export const validate = (data, schema) => {
  return validation(data, schema, {format: "flat"})
}