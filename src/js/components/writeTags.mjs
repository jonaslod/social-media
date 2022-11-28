/**
 * This will take an array of tags and write them out in a string, separated by commas.
 * @param {Object[]} tagList List of tags
 * @returns {string} Tags written out in a string
 * @example
 * ```js
 * container.textContent = writeTags(tags);
 * ```
 */
export default function writeTags(tagList) {
    let html = "";
    if (typeof tagList === "object" && tagList.length > 0) {
        html = tagList.reduce((tags, tag) => {
            if (tags.length > 0) {
                tags += ", ";
            }
            tags += tag.toString();
            return tags;
        }, "");
    }
    return html.length > 0 ? html : "none";
}
