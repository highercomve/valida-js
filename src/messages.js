
export const defaultMessage = (value, errorType, key, compareWith) =>
  `${key} need to be ${errorType}. ${value} is invalid`

export const shouldRequired = (value, errorType, key, c) => `${key} is required`
export const minL = (value, errorType, key, c) => `${key} should less than ${c} and got ${value}`
export const maxL = (value, errorType, key, c) => `${key} more less than ${c} and got ${value}`
export const shouldMatch = (value, errorType, key, c) => `${value} should match with ${c}`
export const shouldEmail = (value, errorType, key, c) => `${value} should be an email`
