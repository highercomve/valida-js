/**
 * @typedef {Object} IError
 * @property {string} [key]
 * @property {string} type - The unique identifier for the error.
 * @property {string} message - A descriptive message of the error.
 */

/**
 * @typedef {Object} ValidationErrors
 * @property {boolean} valid - Indicates whether the validation is successful.
 * @property {IError[]} errors - An array of error objects if any validation fails.
 */

/**
 * @typedef {Object} ValidationResult
 * @property {boolean} valid - Indicates whether the validation is successful.
 * @property {IError} [error] - Error object if validation fails.
 */

/**
 * @typedef {Object} ValidationDescription
 * @property {Function} validate
 * @property {string} type - The type of validation rule.
 * @property {string} name - The name of the field being validated.
 * @property {string} stateMap - A key used to map the state to the field value.
 * @property {any} compareWith - A value or function for comparison during validation.
 * @property {any} defaultValue - The default value for the field.
 * @property {Function} [message] - A custom message generator function.
 */

/**
 * @typedef {Object} RuleDescriptor
 * @property {string} type - The type of rule.
 * @property {Function} validate - The validation function to apply.
 */

/**
 * @callback Rule
 * @param {Object} state - The current state containing the field values.
 * @returns {ValidationResult}
 */

/**
 * @typedef {Object} Rules
 * @property {Rule[]} [rules] - Array of validation rules to apply.
 */

import { defaultMessage } from "./messages";

const capitalizeFirstLetter = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

const capitalize = (string) => {
	return string
		.trim()
		.replace(/-/, " ")
		.split(" ")
		.map(capitalizeFirstLetter)
		.reduce((reduced, value) => `${reduced}${value}`, "");
};

/**
 * Create a rule for validation.
 * @param {ValidationDescription} description - Description of the validation rule.
 * @returns {RuleDescriptor}
 */
function ruleCreator(validators, description) {
	const type = description.type;
	const key = description.name;
	let validate;
	if (description.validate !== undefined) {
		validate = (state) => {
			const message = description.message
				? description.message(state, type, key)
				: defaultMessage(state, type, key);
			return factoryValidationObj(
				description.validate(state),
				type,
				key,
				message,
			);
		};
	} else {
		validate = validators[description.type]
			? validators[description.type](
					description.stateMap,
					type,
					key,
					description.compareWith,
					description.defaultValue,
					description.message,
				)
			: validators.required(
					description.stateMap,
					type,
					key,
					description.compareWith,
					description.defaultValue,
					description.message,
				);
	}

	return { type, validate };
}

/**
 * Create Rules for validating fields.
 * @param {Object} validators - Object containing validation functions.
 * @param {Array<ValidationDescription>} descriptions - Array of field descriptions and their validation rules.
 * @returns {Object}
 */
export function rulesCreator(validators, descriptions = []) {
	return descriptions.reduce((rules, description) => {
		if (
			!description.name ||
			!description.type ||
			!(description.stateMap !== undefined || "validate" in description)
		) {
			throw new Error(
				"Every descriptor needs at least name, type and stateMap or validate",
			);
		}
		const rule = ruleCreator(validators, description);
		const functionName = capitalize(
			`${description.name}-${description.type}`,
		);
		rules[functionName] = rule.validate;
		return rules;
	}, {});
}

/**
 * Apply an array of validation rules to a given state.
 * @param {Array<Rule>} [rules=[]] - Array of validation rules to apply.
 * @param {Object} state - The current state containing the field values.
 * @param {ValidationErrors} [previous={ valid: true, errors: [] }] - Previous validation results.
 * @returns {ValidationErrors}
 */
export function validate(
	rules = [],
	state = {},
	previous = { valid: true, errors: [] },
) {
	return rules.reduce((results, rule) => {
		const appliedRule = rule(state);
		results.valid = results.valid && appliedRule.valid;
		if (appliedRule.error !== undefined) {
			results.errors.push(buildError(appliedRule.error));
		}
		return results;
	}, previous);
}

/**
 * Create an error object from a validation error.
 * @param {IError} error - The validation error to convert.
 * @returns {IError} An object containing the type and message of the error.
 */
function buildError(error) {
	return {
		type: error.type,
		message: error.message,
	};
}

/**
 * Create a validation object.
 * @param {boolean} valid - Indicates whether the validation is successful.
 * @param {string} type - The type of validation rule.
 * @param {string} key - The name of the field being validated.
 * @param {string} [message=""] - An optional message for the error, defaults to an empty string if not provided.
 * @returns {ValidationResult}
 */
export function factoryValidationObj(valid = false, type, key, message = "") {
	if (!type || !key) {
		throw new Error("type and key are required");
	}
	return {
		valid: Boolean(valid),
		error: valid
			? undefined
			: {
					key,
					type,
					message,
				},
	};
}
