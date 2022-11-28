/**
 * Validates if email is formatted correctly
 * @param {string} email The email to validate
 * @returns {boolean} True or false
 * @example
 * ```js
 * const emailIsValid = validateEmail(email);
 * ```
 */
export default function validateEmail(email) {
    const regularExpression = /\S+@\S+\.\S+/;
    const match = regularExpression.test(email);
    return match;
}
