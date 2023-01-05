/**
 * Validates length of string
 * @param {string} value Value to validate
 * @param {number} length Number of minimum characters
 * @returns {boolean} If value.length is greater than length
 * @example
 * ```js
 * validateLength(name, 5);
 * ```
 */
export default function validateLength(value, length) {
    return value.trim().length > length;
}
