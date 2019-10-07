"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regex = exports.isEmail = exports.compareFields = exports.required = exports.maxLength = exports.minLength = void 0;

var _lodash = _interopRequireDefault(require("lodash.get"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~.]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~.]+)*@(?:[a-z0-9](?:[a-z0-9]*[a-z0-9])?\.)+(?:[a-z]{2,})\b/;

var minLength = function minLength(path, errorType, key, minimun) {
  var defaultValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  return function (state) {
    var value = (0, _lodash["default"])(state, path, defaultValue) || defaultValue;
    return (0, _utils.factoryValidationObj)(value.length >= minimun, errorType, key);
  };
};

exports.minLength = minLength;

var maxLength = function maxLength(path, errorType, key, max) {
  var defaultValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  return function (state) {
    var value = (0, _lodash["default"])(state, path, defaultValue) || defaultValue;
    return (0, _utils.factoryValidationObj)(value.length <= max, errorType, key);
  };
};

exports.maxLength = maxLength;

var required = function required(path, errorType, key) {
  return function (state) {
    return (0, _utils.factoryValidationObj)((0, _lodash["default"])(state, path), errorType, key);
  };
};

exports.required = required;

var compareFields = function compareFields(path, errorType, key, otherFieldPath) {
  return function (state) {
    var fieldOne = (0, _lodash["default"])(state, path);
    var fieldTwo = (0, _lodash["default"])(state, otherFieldPath);
    return (0, _utils.factoryValidationObj)(fieldOne === fieldTwo, errorType, key);
  };
};

exports.compareFields = compareFields;

var isEmail = function isEmail(path, errorType, key, _) {
  var defaultValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  return function (state) {
    var value = (0, _lodash["default"])(state, path, defaultValue) || defaultValue;
    return (0, _utils.factoryValidationObj)(emailRegex.test(value), errorType, key);
  };
};

exports.isEmail = isEmail;

var regex = function regex(path, errorType, key, expresion) {
  var defaultValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  return function (state) {
    var value = (0, _lodash["default"])(state, path, defaultValue) || defaultValue;
    return (0, _utils.factoryValidationObj)(expresion.test(value), errorType, key);
  };
};

exports.regex = regex;