import get from "lodash.get";
import { factoryValidationObj } from "./utils";
import {
	defaultMessage,
	maxL,
	minL,
	shouldEmail,
	shouldMatch,
	shouldRequired,
} from "./messages";

const emailRegex =
	/[a-z0-9!#$%&'*+/=?^_`{|}~.]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~.]+)*@(?:[a-z0-9](?:[a-z0-9]*[a-z0-9])?\.)+(?:[a-z]{2,})\b/;

/** @import { Rule } from "./utils" */

/**
 * Validates that the length of a field is at least the specified minimum.
 * @param {string} path - The path to the field in the state object.
 * @param {string} errorType - The type of error to return if validation fails.
 * @param {string} key - The key used for error messages.
 * @param {number} minimun - The minimum length allowed.
 * @param {any} defaultValue - The default value to use if the field is not found in the state.
 * @param {function} message - The function to generate the error message. Default is `minL`.
 * @returns {Rule} A validation rule function that takes a state object and returns an object with validation result, errorType, key, and message.
 */
export const minLength = (
	path,
	errorType,
	key,
	minimun,
	defaultValue = "",
	message = minL,
) => {
	return (state) => {
		const value = get(state, path, defaultValue) || defaultValue;
		return factoryValidationObj(
			value.length >= minimun,
			errorType,
			key,
			message(value, errorType, key, minimun),
		);
	};
};

/**
 * Validates that the length of a field is at most the specified maximum.
 * @param {string} path - The path to the field in the state object.
 * @param {string} errorType - The type of error to return if validation fails.
 * @param {string} key - The key used for error messages.
 * @param {number} max - The maximum length allowed.
 * @param {any} defaultValue - The default value to use if the field is not found in the state.
 * @param {function} message - The function to generate the error message. Default is `maxL`.
 * @returns {Rule} A validation rule function that takes a state object and returns an object with validation result, errorType, key, and message.
 */
export const maxLength = (
	path,
	errorType,
	key,
	max,
	defaultValue = "",
	message = maxL,
) => {
	return (state) => {
		const value = get(state, path, defaultValue) || defaultValue;
		return factoryValidationObj(
			value.length <= max,
			errorType,
			key,
			message(value, errorType, key, max),
		);
	};
};

/**
 * Validates that a field is required.
 * @param {string} path - The path to the field in the state object.
 * @param {string} errorType - The type of error to return if validation fails.
 * @param {string} key - The key used for error messages.
 * @param {any} c - Not used but kept as a parameter for consistency with other validators.
 * @param {function} message - The function to generate the error message. Default is `shouldRequired`.
 * @returns {Rule} A validation rule function that takes a state object and returns an object with validation result, errorType, key, and message.
 */
export const required = (
	path,
	errorType,
	key,
	c,
	_,
	message = shouldRequired,
) => {
	return (state) => {
		const value = get(state, path);
		return factoryValidationObj(
			value,
			errorType,
			key,
			message(value, errorType, key, c),
		);
	};
};

/**
 * Validates that two fields have the same value.
 * @param {string} path - The path to the field in the state object.
 * @param {string} errorType - The type of error to return if validation fails.
 * @param {string} key - The key used for error messages.
 * @param {string} otherFieldPath - The path to the other field to compare with.
 * @param {any} _ - Not used but kept as a parameter for consistency with other validators.
 * @param {function} message - The function to generate the error message. Default is `shouldMatch`.
 * @returns {Rule} A validation rule function that takes a state object and returns an object with validation result, errorType, key, and message.
 */
export const compareFields = (
	path,
	errorType,
	key,
	otherFieldPath,
	_,
	message = shouldMatch,
) => {
	return (state) => {
		const fieldOne = get(state, path);
		const fieldTwo = get(state, otherFieldPath);
		return factoryValidationObj(
			fieldOne === fieldTwo,
			errorType,
			key,
			message(fieldOne, errorType, key, otherFieldPath),
		);
	};
};

/**
 * Validates that a field is an email address.
 * @param {string} path - The path to the field in the state object.
 * @param {string} errorType - The type of error to return if validation fails.
 * @param {string} key - The key used for error messages.
 * @param {any} _ - Not used but kept as a parameter for consistency with other validators.
 * @param {any} defaultValue - The default value to use if the field is not found in the state. Default is an empty string.
 * @param {function} message - The function to generate the error message. Default is `shouldEmail`.
 * @returns {Rule} A validation rule function that takes a state object and returns an object with validation result, errorType, key, and message.
 */
export const isEmail = (
	path,
	errorType,
	key,
	_,
	defaultValue = "",
	message = shouldEmail,
) => {
	return (state) => {
		const value = get(state, path, defaultValue) || defaultValue;
		return factoryValidationObj(
			emailRegex.test(value),
			errorType,
			key,
			message(value, errorType, key, _),
		);
	};
};

/**
 * Validates that a field matches a specified regular expression.
 * @param {string} path - The path to the field in the state object.
 * @param {string} errorType - The type of error to return if validation fails.
 * @param {string} key - The key used for error messages.
 * @param {RegExp} expresion - The regular expression to test against.
 * @param {any} defaultValue - The default value to use if the field is not found in the state. Default is an empty string.
 * @param {function} message - The function to generate the error message. Default is `defaultMessage`.
 * @returns {Rule} A validation rule function that takes a state object and returns an object with validation result, errorType, key, and message.
 */
export const regex = (
	path,
	errorType,
	key,
	expresion,
	defaultValue = "",
	message = defaultMessage,
) => {
	return (state) => {
		const value = get(state, path, defaultValue) || defaultValue;
		return factoryValidationObj(
			expresion.test(value),
			errorType,
			key,
			message(value, errorType, key, expresion),
		);
	};
};
