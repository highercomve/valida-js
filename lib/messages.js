"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldEmail = exports.shouldMatch = exports.maxL = exports.minL = exports.shouldRequired = exports.defaultMessage = void 0;

var defaultMessage = function defaultMessage(value, errorType, key, compareWith) {
  return "".concat(key, " need to be ").concat(errorType, ". ").concat(value, " is invalid");
};

exports.defaultMessage = defaultMessage;

var shouldRequired = function shouldRequired(value, errorType, key, c) {
  return "".concat(key, " is required");
};

exports.shouldRequired = shouldRequired;

var minL = function minL(value, errorType, key, c) {
  return "".concat(key, " should less than ").concat(c, " and got ").concat(value);
};

exports.minL = minL;

var maxL = function maxL(value, errorType, key, c) {
  return "".concat(key, " more less than ").concat(c, " and got ").concat(value);
};

exports.maxL = maxL;

var shouldMatch = function shouldMatch(value, errorType, key, c) {
  return "".concat(value, " should match with ").concat(c);
};

exports.shouldMatch = shouldMatch;

var shouldEmail = function shouldEmail(value, errorType, key, c) {
  return "".concat(value, " should be an email");
};

exports.shouldEmail = shouldEmail;