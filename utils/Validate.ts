import validation from 'validate.js'

export const validate = (data, schema) => {
  const result = validation(data, schema, {format: "flat"})
  return typeof result !== "undefined" && result.length > 0 ? result[0] : ""
}