import writeTags from "../components/writeTags.mjs";

/**
 * Adds or removes tags from set
 * @param {Set} tags Set of tags
 * @param {string} tag Tag to add to set
 * @param {*} container The container which will contain the tags
 * @param {boolean} [isAdding=true] If the function is adding or clearing tags
 * @example
 * ```js
 * const tags = new Set();
 * btnAdd.addEventListener("click", () => manage.tags(tags, tagInput.value.trim(), container));
 * ```
 */
export default function manageTags(tags, tag, container, isAdding = true) {
    if (isAdding) {
        if (tag.length > 0) {
            tags.add(tag);
        }
    } else {
        tags.clear();
    }
    container.textContent = writeTags(Array.from(tags));
}
