"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rulesCreator = rulesCreator;
exports.validate = validate;
exports.factoryValidationObj = factoryValidationObj;

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
var capitalizeFirstLetter = function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

var capitalize = function capitalize(string) {
  return string.trim().replace(/-/, ' ').split(' ').map(capitalizeFirstLetter).reduce(function (reduced, value) {
    return "".concat(reduced).concat(value);
  }, '');
};
/**
 * Create a rule for validation
 * @param {IDescription} description
 * @returns {IRulesDescriptor}
*/


function ruleCreator(validators, description) {
  var type = description.type;
  var key = description.name;

  if (description.validate) {
    return function (state) {
      return factoryValidationObj(description.validate(state), type, key);
    };
  }

  var validate = validators[description.type] ? validators[description.type](description.stateMap, type, key, description.compareWith, description.defaultValue) : validators.required(description.stateMap, type, key, description.compareWith, description.defaultValue);
  return validate;
}
/**
 * Create Rules for validate
 * @param {Object} validators
 * @param {Array<IDescription>} descriptions
 * @returns {Object}
*/


function rulesCreator(validators) {
  var descriptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return descriptions.reduce(function (rules, description) {
    if (!description.name || !description.type || !(description.stateMap || description.validate)) {
      throw new Error('Every descriptor needs at least name, type and stateMap or validate');
    }

    var validate = ruleCreator(validators, description);
    var functionName = capitalize("".concat(description.name, "-").concat(description.type));
    rules[functionName] = validate;
    return rules;
  }, {});
}
/**
 * Pass array of rules
 * @param {Array} rules
 * @param {Object} state
 * @param {Object} previus
 * @returns {validationsObj}
 */


function validate() {
  var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var state = arguments.length > 1 ? arguments[1] : undefined;
  var previus = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    valid: true,
    errors: {}
  };
  return Object.keys(rules).reduce(function (results, key) {
    var rule = rules[key];
    var appliedRule = rule(state);
    results.valid = results.valid && appliedRule.valid;

    if (appliedRule.error) {
      results.errors[appliedRule.error.key] = results.errors[appliedRule.error.key] ? results.errors[appliedRule.error.key].concat([appliedRule.error.type]) : [appliedRule.error.type];
    }

    return results;
  }, previus);
}
/**
 * Create a validation object
 * @param {Boolean} valid
 * @param {String} type
 * @param {String} key
 * @returns {validationObj}
 */


function factoryValidationObj() {
  var valid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var type = arguments.length > 1 ? arguments[1] : undefined;
  var key = arguments.length > 2 ? arguments[2] : undefined;

  if (!type || !key) {
    throw new Error('type and key are required');
  }

  return {
    valid: Boolean(valid),
    error: valid ? undefined : {
      key: key,
      type: type
    }
  };
}