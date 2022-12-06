/**
 * This will format an unformatted date
 * @param {string} unformattedDate Unformatted date
 * @returns {string} Formatted date
 * @example
 * ```js
 * //Format date from API call
 * const date = formatDate(created);
 * ```
 */
export default function formatDate(unformattedDate) {
    const date = new Date(unformattedDate);
    return date.toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
}
