/**
 * Validates if value is defined
 * @param {*} value Value to check
 * @param {string} [type=""] What type of value
 * @returns {*} Returns the value if it is valid, or `undefined ${type}` if not
 * @example
 * ```js
 * const name = validateDefined(name);
 * ```
 */
export default function validateDefined(value, type = "") {
    return value ? value : `undefined ${type}`;
}
