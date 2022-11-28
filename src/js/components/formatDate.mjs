/**
 * This will format an unformatted date to a formatted date object
 * @param {string} unformattedDate Unformatted date
 * @returns {{year: number, month: number, day:number}} Formatted date
 * @example
 * ```js
 * //Format date from API call
 * const { year, month, day } = formatDate(created);
 * ```
 */
export default function formatDate(unformattedDate) {
    const newDate = new Date(unformattedDate);
    let year = newDate.getFullYear();
    let month = newDate.getMonth();
    let day = newDate.getDate();

    return { year, month: (month += 1), day };
}
