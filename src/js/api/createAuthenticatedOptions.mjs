import storage from "../storage/index.mjs";
/**
 * Creates a authenticated options parameter to be used in a fetch method
 * @param {string} [method="GET"] Method of fetch request options
 * @param {Object} [body=null] Body of fetch request options
 * @returns {Object} The authenticated options parameter
 * @example
 * ```js
 * //Create authenticated options for a POST request
 * const options = createAuthenticatedOptions("POST", { body: bodyValue });
 * ```
 */
export default function createAuthenticatedOptions(method = "GET", body = null) {
    const accessToken = storage.getLocalStorage("accessToken");
    const options = {
        method: method,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-type": "application/json; charset=UTF-8",
        },
    };
    if (body) {
        options["body"] = JSON.stringify(body);
    }
    return options;
}
