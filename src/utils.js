/**
 * @typedef {Object} IError
 * @property {string} key
 * @property {string} error
 */

/**
 * @typedef {Object} validationsObj
 * @property {boolean} valid
 * @property {Object} error
 */

/**
 * @typedef {Object} validationObj
 * @property {boolean} valid
 * @property {IError} errors
 */

/**
 * @typedef {Object} IDescription
 * @property {string} type
 * @property {string} name
 * @property {string} stateMap
 * @property {any} compareWith
 * @property {any} defaultValue
 */

/**
 * @typedef {Object} IRulesDescriptor
 * @property {string} type
 * @property {Function} validate
*/

/**
 * @typedef {Function} rule
 * @param {Object} state
 * @param {string} key
 * @returns {validationObj}
*/

/**
 * @typedef {Object} rules
*/

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const capitalize = (string) => {
  return string
    .trim()
    .replace(/-/, ' ')
    .split(' ')
    .map(capitalizeFirstLetter)
    .reduce((reduced, value) => `${reduced}${value}`, '')
}

/**
 * Create a rule for validation
 * @param {IDescription} description
 * @returns {IRulesDescriptor}
*/
function ruleCreator (validators, description) {
  const type = description.type
  const key = description.name
  if (description.validate) {
    return (state) => {
      return factoryValidationObj(description.validate(state), type, key)
    }
  }
  const validate = validators[description.type]
    ? validators[description.type](description.stateMap, type, key, description.compareWith, description.defaultValue)
    : validators.required(description.stateMap, type, key, description.compareWith, description.defaultValue)
  return validate
}

/**
 * Create Rules for validate
 * @param {Object} validators
 * @param {Array<IDescription>} descriptions
 * @returns {Object}
*/
export function rulesCreator (validators, descriptions = []) {
  return descriptions.reduce((rules, description) => {
    if (!description.name || !description.type || !(description.stateMap || description.validate)) {
      throw new Error('Every descriptor needs at least name, type and stateMap or validate')
    }
    const validate = ruleCreator(validators, description)
    const functionName = capitalize(`${description.name}-${description.type}`)
    rules[functionName] = validate
    return rules
  }, {})
}

/**
 * Pass array of rules
 * @param {Array} rules
 * @param {Object} state
 * @param {Object} previus
 * @returns {validationsObj}
 */
export function validate (rules = [], state, previus = { valid: true, errors: {} }) {
  return Object.keys(rules).reduce((results, key) => {
    const rule = rules[key]
    const appliedRule = rule(state)
    results.valid = results.valid && appliedRule.valid
    if (appliedRule.error) {
      results.errors[appliedRule.error.key] = results.errors[appliedRule.error.key]
        ? results.errors[appliedRule.error.key].concat([appliedRule.error.type])
        : [appliedRule.error.type]
    }
    return results
  }, previus)
}

/**
 * Create a validation object
 * @param {Boolean} valid
 * @param {String} type
 * @param {String} key
 * @returns {validationObj}
 */
export function factoryValidationObj (valid = false, type, key) {
  if (!type || !key) {
    throw new Error('type and key are required')
  }
  return {
    valid: Boolean(valid),
    error: valid ? undefined : { key, type }
  }
}
