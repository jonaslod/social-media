/**
 * Saves to local storage under specified key
 * @param {string} key Key to save data under
 * @param {*} state Data to save under key
 * @example
 * ```js
 * saveToLocalStorage("name", username);
 * ```
 */
export default function saveToLocalStorage(key, state) {
    localStorage.setItem(key, JSON.stringify(state));
}
