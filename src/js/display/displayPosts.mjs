/**
 * This will display an array of posts to a specified container.
 * @param {*} container The container which the function appends the posts
 * @param {Object[]} posts Array of posts
 * @param {boolean} [isProfilePage=false] If the current page is the profile page
 * @param {string} [avatar=null] Profile icon src (used on the profile page)
 * @example
 * ```js
 * displayPosts(postContainer, posts);
 * ```
 */
export default async function displayPosts(container, posts, isProfilePage = false, avatar = "") {
    container.innerHTML = "";
    if (typeof posts === "object" && posts.length > 0) {
        const { defined: validateDefined } = (await import("../validation/index.mjs")).default;
        const { profileIcon: displayProfileIcon } = (await import("../display/index.mjs")).default;
        const { formatDate, writeTags } = (await import("../components/index.mjs")).default;

        posts.forEach((post) => {
            const { id, updated, tags, title, body, author } = post;
            const authorName = isProfilePage ? post.owner : author.name;

            //Profile icon
            const icon = displayProfileIcon(isProfilePage ? avatar : author.avatar, authorName);
            const profileIconWrapper = document.createElement("div");
            profileIconWrapper.setAttribute("class", "contact-icon me-2 d-flex align-items-center justify-content-center");
            profileIconWrapper.appendChild(icon);

            //Author name says
            const nameWrapper = document.createElement("p");
            nameWrapper.setAttribute("class", "m-0");
            const authorWrapper = document.createElement("span");
            authorWrapper.setAttribute("class", "fw-bold");
            authorWrapper.textContent = authorName;

            const saysSpan = document.createElement("span");
            saysSpan.textContent = " says:";

            nameWrapper.appendChild(authorWrapper);
            nameWrapper.appendChild(saysSpan);

            //Upload date
            const timeWrapper = document.createElement("p");
            timeWrapper.setAttribute("class", "m-0 text-muted");
            timeWrapper.textContent = formatDate(updated);

            const postDetails = document.createElement("div");
            postDetails.appendChild(nameWrapper);
            postDetails.appendChild(timeWrapper);

            //Author details (name and upload)
            const detailsWrapper = document.createElement("a");
            detailsWrapper.setAttribute("class", "text-decoration-none text-black d-flex align-items-center border-bottom pb-2");
            detailsWrapper.setAttribute("href", `/profile/?name=${authorName}`);
            detailsWrapper.appendChild(profileIconWrapper);
            detailsWrapper.appendChild(postDetails);

            //Post title
            const postTitle = document.createElement("h2");
            postTitle.textContent = title;

            //Post tags
            const categoryIcon = document.createElement("img");
            categoryIcon.setAttribute("src", "/img/icon/category-icon.png");
            categoryIcon.setAttribute("alt", "Category icon");
            categoryIcon.setAttribute("class", "w-100");
            const categoryIconWrapper = document.createElement("div");
            categoryIconWrapper.setAttribute("class", "category-icon me-2");
            categoryIconWrapper.appendChild(categoryIcon);

            const postTagsContent = document.createElement("span");
            postTagsContent.textContent = writeTags(tags);
            const postTags = document.createElement("p");
            postTags.setAttribute("class", "d-flex align-items-center");
            postTags.appendChild(categoryIconWrapper);
            postTags.appendChild(postTagsContent);

            //Post body
            const postContent = document.createElement("p");
            postContent.setAttribute("class", "m-0 fst-italic pt-2 pb-2");
            postContent.textContent = validateDefined(body, "post content");

            //Post content (title, tags, body)
            const postContentWrapper = document.createElement("a");
            postContentWrapper.setAttribute("class", "d-block text-decoration-none text-black");
            postContentWrapper.setAttribute("href", `/post/?id=${id}`);
            postContentWrapper.appendChild(postTitle);
            postContentWrapper.appendChild(postTags);
            postContentWrapper.appendChild(postContent);

            //Post (author details and post content)
            const postWrapper = document.createElement("div");
            postWrapper.setAttribute("class", "p-2 border border-dark rounded");
            postWrapper.appendChild(detailsWrapper);
            postWrapper.appendChild(postContentWrapper);

            //Outer column
            const column = document.createElement("div");
            column.setAttribute("class", "col-12 col-sm-6 p-3");
            column.appendChild(postWrapper);

            container.appendChild(column);
        });
    }
}
