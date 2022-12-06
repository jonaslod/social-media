import display from "../display/index.mjs";

/**
 * Manages response codes from API calls
 * @param {number} code Response code from API call
 * @param {*} container The container which the function appends the message
 * @example
 * ```js
 * manageResponseCodes(response.status);
 * ```
 */
export default function manageResponseCodes(code, container) {
    let message = false;
    switch (code) {
        case 404:
            message = "Item with matching ID was not found in our database.";
            break;
        case 409:
            message = "Too many API requests, wait a bit and try again.";
            break;
        case 500:
            display.notAuthenticated();
            break;
        default:
            message = "An error occurred while trying to fetch this resource.";
    }
    if (message) {
        display.error(message, container);
    }
}
