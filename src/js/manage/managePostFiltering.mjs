/**
 * Manages post filtering
 * @param {Object[]} posts Array of posts to filter
 * @param {string} filterValue State of filter select
 * @param {string} searchValue Search value from input
 * @param {string} queryString Search from query string
 * @returns {Object[]} Filtered posts
 * @example
 * ```js
 * const filteredPosts = await managePostFiltering([...posts], filterSelect.value, searchInput.value, queryString);
 * ```
 */
export default async function managePostFiltering(posts, filterValue, searchValue, queryString) {
    let filteredPosts = [...posts];
    if (queryString && queryString.trim().length > 0) {
        filteredPosts = filteredPosts.filter(({ title }) => title.toLowerCase().includes(queryString.toLowerCase()));
    } else {
        const todaysDate = new Date();
        switch (filterValue) {
            case "today":
                filteredPosts = filteredPosts.filter(({ updated }) => new Date(updated).getDate() === todaysDate.getDate());
                break;
            case "month":
                filteredPosts = filteredPosts.filter(({ updated }) => new Date(updated).getMonth() === todaysDate.getMonth());
                break;
            case "year":
                filteredPosts = filteredPosts.filter(({ updated }) => new Date(updated).getFullYear() === todaysDate.getFullYear());
                break;
        }
        if (searchValue.trim().length > 0) {
            filteredPosts = filteredPosts.filter(({ title }) => title.toLowerCase().includes(searchValue.toLowerCase()));
        }
    }
    return filteredPosts;
}
