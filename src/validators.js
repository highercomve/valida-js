import get from 'lodash.get'
import { factoryValidationObj } from './utils'
import {
  minL,
  maxL,
  shouldRequired,
  shouldEmail,
  shouldMatch,
  defaultMessage
} from './messages'
const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~.]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~.]+)*@(?:[a-z0-9](?:[a-z0-9]*[a-z0-9])?\.)+(?:[a-z]{2,})\b/

export const minLength = (path, errorType, key, minimun, defaultValue = '', message = minL) => {
  return (state) => {
    const value = get(state, path, defaultValue) || defaultValue
    return factoryValidationObj(value.length >= minimun, errorType, key, message(value, errorType, key, minimun))
  }
}

export const maxLength = (path, errorType, key, max, defaultValue = '', message = maxL) => {
  return (state) => {
    const value = get(state, path, defaultValue) || defaultValue
    return factoryValidationObj(value.length <= max, errorType, key, message(value, errorType, key, max))
  }
}

export const required = (path, errorType, key, c, _, message = shouldRequired) => {
  return (state) => {
    const value = get(state, path)
    return factoryValidationObj(value, errorType, key, message(value, errorType, key, c))
  }
}

export const compareFields = (path, errorType, key, otherFieldPath, _, message = shouldMatch) => {
  return (state) => {
    const fieldOne = get(state, path)
    const fieldTwo = get(state, otherFieldPath)
    return factoryValidationObj(fieldOne === fieldTwo, errorType, key, message(fieldOne, errorType, key, otherFieldPath))
  }
}

export const isEmail = (path, errorType, key, _, defaultValue = '', message = shouldEmail) => {
  return (state) => {
    const value = get(state, path, defaultValue) || defaultValue
    return factoryValidationObj(emailRegex.test(value), errorType, key, message(value, errorType, key, _))
  }
}

export const regex = (path, errorType, key, expresion, defaultValue = '', message = defaultMessage) => {
  return (state) => {
    const value = get(state, path, defaultValue) || defaultValue
    return factoryValidationObj(expresion.test(value), errorType, key, message(value, errorType, key, expresion))
  }
}
