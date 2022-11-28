/**
 * Gets value from query string
 * @param {string} key Which parameter should be returned
 * @returns {string} The specified value
 * @example
 * ```js
 * const searchParam = storage.getParameterString("search");
 * ```
 */
export default function getParameterString(key) {
    const queryString = document.location.search;
    const parameters = new URLSearchParams(queryString);
    return parameters.get(key);
}
