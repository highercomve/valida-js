import get from 'lodash.get'
import { factoryValidationObj } from './utils'

const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/

export const minLength = (path, errorType, key, minimun, defaultValue = '') => {
  return (state) => {
    const value = get(state, path, defaultValue) || defaultValue
    return factoryValidationObj(value.length >= minimun, errorType, key)
  }
}

export const maxLength = (path, errorType, key, max, defaultValue = '') => {
  return (state) => {
    const value = get(state, path, defaultValue) || defaultValue
    return factoryValidationObj(value.length <= max, errorType, key)
  }
}

export const required = (path, errorType, key) => {
  return (state) => factoryValidationObj(get(state, path), errorType, key)
}

export const compareFields = (path, errorType, key, otherFieldPath) => {
  return (state) => {
    const fieldOne = get(state, path)
    const fieldTwo = get(state, otherFieldPath)
    return factoryValidationObj(fieldOne === fieldTwo, errorType, key)
  }
}

export const isEmail = (path, errorType, key, _, defaultValue = '') => {
  return (state) => {
    const value = get(state, path, defaultValue) || defaultValue
    return factoryValidationObj(emailRegex.test(value), errorType, key)
  }
}

export const regex = (path, errorType, key, expresion, defaultValue = '') => {
  return (state) => {
    const value = get(state, path, defaultValue) || defaultValue
    return factoryValidationObj(expresion.test(value), errorType, key)
  }
}
