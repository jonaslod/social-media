/**
 * Manages input border and error message, based on validness
 * @param {*} isValid Test to check validness
 * @param {*} input The input
 * @param {*} errorContainer The error message
 * @returns {boolean} Validness of input
 * @example
 * ```js
 * usernameInput.addEventListener("blur", () => {
 *     manageInput(validateLength(usernameInput.value, 0), usernameInput, usernameError);
 * });
 * ```
 */
export default function manageInput(isValid, input, errorContainer) {
    if (isValid) {
        input.classList.remove("border-danger");
        errorContainer.classList.add("d-none");
        return true;
    }
    input.classList.add("border-danger");
    errorContainer.classList.remove("d-none");
    return false;
}
