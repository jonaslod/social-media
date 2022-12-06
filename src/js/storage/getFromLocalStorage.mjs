/**
 * Gets value from local storage under specified key
 * @param {string} key Key to locate
 * @returns {*} Value under specified key or undefined
 * @example
 * ```js
 * const username = getFromLocalStorage("name");
 * ```
 */
export default function getFromLocalStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (error) {
        return undefined;
    }
}
