import createAuthenticatedOptions from "./createAuthenticatedOptions.mjs";
/**
 * Makes fetch requests to the API
 * @param {string} url URL of fetch request
 * @param {Object} [options] Options parameter of fetch request
 * @param {boolean} [shouldReturnJson=false] If the function should return the whole response, or response.json()
 * @returns {Object} Either response or response.json()
 * @example
 * ```js
 * //Make GET request to API
 * const response = await fetchApi(url);
 * ```
 */
export default async function fetchApi(url, options = createAuthenticatedOptions(), shouldReturnJson = false) {
    const response = await fetch(url, options);
    return shouldReturnJson ? response.json() : response;
}
