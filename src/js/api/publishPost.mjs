import api from "./index.mjs";
/**
 * This will publish a new post / update an existing post
 * @param {string} method Specifies which fetch method
 * @param {string} titleValue Title of the post
 * @param {string} bodyValue Body of the post
 * @param {Set} tags Tags of the post
 * @returns {Object} The response from the fetch method
 * @example
 * ```js
 * //Publish post to API
 * const response = await publishPost("POST", titleInput.value, bodyInput.value, tags);
 * ```
 */
export default async function publishPost(method, titleValue, bodyValue, tags, postId = "") {
    const body = {
        title: titleValue,
        body: bodyValue.trim().length > 0 ? bodyValue.trim() : null,
        tags: tags.size > 0 ? Array.from(tags) : [],
    };

    const response = await api.fetch(`${api.baseUrl}/posts/${postId}`, api.createAuthOptions(method, body));
    return response;
}
