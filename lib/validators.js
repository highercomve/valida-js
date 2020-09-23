"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regex = exports.isEmail = exports.compareFields = exports.required = exports.maxLength = exports.minLength = void 0;

var _lodash = _interopRequireDefault(require("lodash.get"));

var _utils = require("./utils");

var _messages = require("./messages");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~.]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~.]+)*@(?:[a-z0-9](?:[a-z0-9]*[a-z0-9])?\.)+(?:[a-z]{2,})\b/;

var minLength = function minLength(path, errorType, key, minimun) {
  var defaultValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var message = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _messages.minL;
  return function (state) {
    var value = (0, _lodash["default"])(state, path, defaultValue) || defaultValue;
    return (0, _utils.factoryValidationObj)(value.length >= minimun, errorType, key, message(value, errorType, key, minimun));
  };
};

exports.minLength = minLength;

var maxLength = function maxLength(path, errorType, key, max) {
  var defaultValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var message = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _messages.maxL;
  return function (state) {
    var value = (0, _lodash["default"])(state, path, defaultValue) || defaultValue;
    return (0, _utils.factoryValidationObj)(value.length <= max, errorType, key, message(value, errorType, key, max));
  };
};

exports.maxLength = maxLength;

var required = function required(path, errorType, key, c, _) {
  var message = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _messages.shouldRequired;
  return function (state) {
    var value = (0, _lodash["default"])(state, path);
    return (0, _utils.factoryValidationObj)(value, errorType, key, message(value, errorType, key, c));
  };
};

exports.required = required;

var compareFields = function compareFields(path, errorType, key, otherFieldPath, _) {
  var message = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _messages.shouldMatch;
  return function (state) {
    var fieldOne = (0, _lodash["default"])(state, path);
    var fieldTwo = (0, _lodash["default"])(state, otherFieldPath);
    return (0, _utils.factoryValidationObj)(fieldOne === fieldTwo, errorType, key, message(fieldOne, errorType, key, otherFieldPath));
  };
};

exports.compareFields = compareFields;

var isEmail = function isEmail(path, errorType, key, _) {
  var defaultValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var message = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _messages.shouldEmail;
  return function (state) {
    var value = (0, _lodash["default"])(state, path, defaultValue) || defaultValue;
    return (0, _utils.factoryValidationObj)(emailRegex.test(value), errorType, key, message(value, errorType, key, _));
  };
};

exports.isEmail = isEmail;

var regex = function regex(path, errorType, key, expresion) {
  var defaultValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var message = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _messages.defaultMessage;
  return function (state) {
    var value = (0, _lodash["default"])(state, path, defaultValue) || defaultValue;
    return (0, _utils.factoryValidationObj)(expresion.test(value), errorType, key, message(value, errorType, key, expresion));
  };
};

exports.regex = regex;