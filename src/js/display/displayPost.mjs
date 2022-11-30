import components from "../components/index.mjs";
import validate from "../validation/index.mjs";
import display from "./index.mjs";
import storage from "../storage/index.mjs";

/**
 * This will display a single post to a specified container.
 * @param {*} container The container which the function appends the post
 * @param {Object} post The post object
 * @example
 * ```js
 * displayPost(postContainer, posts);
 * ```
 */
export default function displayPost(container, post) {
    const { id, title, body, tags, updated, author } = post;

    const heading = document.querySelector("h1");
    const btnControls = document.querySelector(".btn-controls");
    document.title = `${title} | SOCIAL MEDIA`;
    heading.textContent = title;

    //Profile icon
    const contactIconWrapper = document.createElement("div");
    contactIconWrapper.setAttribute("class", "contact-icon me-2 d-flex align-items-center justify-content-center");
    contactIconWrapper.appendChild(display.profileIcon(author.avatar, author.name));

    //Profile name
    const boldSpan = document.createElement("span");
    boldSpan.setAttribute("class", "fw-bold");
    boldSpan.textContent = "Posted by: ";
    const authorName = document.createElement("span");
    authorName.textContent = author.name;

    const authorNameWrapper = document.createElement("p");
    authorNameWrapper.setAttribute("class", "m-0");
    authorNameWrapper.appendChild(boldSpan);
    authorNameWrapper.appendChild(authorName);

    //Upload date
    const uploadDateWrapper = document.createElement("p");
    uploadDateWrapper.setAttribute("class", "m-0 text-muted");
    uploadDateWrapper.textContent = components.formatDate(updated);

    //Profile details (Profile name and upload date)
    const profileDetails = document.createElement("div");
    profileDetails.appendChild(authorNameWrapper);
    profileDetails.appendChild(uploadDateWrapper);

    //Profile (details and contact icon)
    const profileWrapper = document.createElement("a");
    profileWrapper.setAttribute("class", "text-decoration-none text-black  d-flex align-items-center");
    profileWrapper.setAttribute("href", `/profile/?name=${author.name}`);
    profileWrapper.appendChild(contactIconWrapper);
    profileWrapper.appendChild(profileDetails);

    //Category icon
    const categoryIcon = document.createElement("img");
    categoryIcon.setAttribute("src", "/img/icon/category-icon.png");
    categoryIcon.setAttribute("alt", "Category icon");
    categoryIcon.setAttribute("class", "w-100");

    const categoryIconWrapper = document.createElement("div");
    categoryIconWrapper.setAttribute("class", "category-icon me-2");
    categoryIconWrapper.appendChild(categoryIcon);

    //Category content
    const categoryContent = document.createElement("p");
    categoryContent.setAttribute("class", "m-0");
    categoryContent.textContent = components.writeTags(tags);

    //Category (icon and content)
    const categoryWrapper = document.createElement("div");
    categoryWrapper.setAttribute("class", "d-flex align-items-center border-bottom my-3 pb-3");
    categoryWrapper.appendChild(categoryIconWrapper);
    categoryWrapper.appendChild(categoryContent);

    //Post content (body)
    const postContent = document.createElement("p");
    postContent.setAttribute("class", "fst-italic");
    postContent.textContent = validate.defined(body, "post content");

    //Everything together
    container.innerHTML = "";
    container.appendChild(profileWrapper);
    container.appendChild(categoryWrapper);
    container.appendChild(postContent);

    //  Edit and delete buttons should only be shown if the
    //  user has the same name as the author of the post
    if (storage.getLocalStorage("name") === author.name) {
        const comments = document.querySelector(".comments-wrapper");
        const editIcon = document.createElement("img");
        editIcon.setAttribute("src", "/img/icon/edit.png");
        editIcon.setAttribute("alt", "Edit post icon");
        editIcon.setAttribute("class", "w-100");

        const editIconWrapper = document.createElement("div");
        editIconWrapper.setAttribute("class", "category-icon");
        editIconWrapper.appendChild(editIcon);

        const editBtn = document.createElement("button");
        editBtn.setAttribute("type", "button");
        editBtn.setAttribute("class", "btn btn-link p-3 me-3");
        editBtn.addEventListener("click", () => {
            comments.classList.add("d-none");
            display.updateForm(container, post);
        });
        editBtn.appendChild(editIconWrapper);

        const deleteIcon = document.createElement("img");
        deleteIcon.setAttribute("src", "/img/icon/delete.png");
        deleteIcon.setAttribute("alt", "Delete post icon");
        deleteIcon.setAttribute("class", "w-100");

        const deleteIconWrapper = document.createElement("div");
        deleteIconWrapper.setAttribute("class", "category-icon");
        deleteIconWrapper.appendChild(deleteIcon);

        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("type", "button");
        deleteBtn.setAttribute("class", "btn btn-link p-3");
        deleteBtn.appendChild(deleteIconWrapper);
        deleteBtn.addEventListener("click", async () => {
            const heading = document.querySelector("h1");
            comments.classList.add("d-none");
            if (window.confirm("Are you sure you want to delete the post?")) {
                heading.classList.add("fst-italic");
                heading.textContent = "Loading ...";
                const { baseUrl, createAuthOptions, fetch: fetchApi } = (await import("../api/index.mjs")).default;
                const response = await fetchApi(`${baseUrl}/posts/${id}`, createAuthOptions("DELETE"));
                if (response.status === 200) {
                    heading.classList.remove("fwt-italic");
                    heading.textContent = "Post was deleted";
                    container.innerHTML = "";
                    btnControls.innerHTML = "";
                    const backToHome = document.createElement("a");
                    backToHome.setAttribute("href", "/");
                    backToHome.textContent = "Back to home >>";
                    container.appendChild(backToHome);
                }
            }
        });
        btnControls.innerHTML = "";
        btnControls.appendChild(editBtn);
        btnControls.appendChild(deleteBtn);
    }
}
