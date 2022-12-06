import writeTags from "../components/writeTags.mjs";
import display from "./index.mjs";
import validation from "../validation/index.mjs";
import manage from "../manage/index.mjs";

/**
 * This displays and populates the update form on the post page
 * @param {HTMLElement} container The container which will contain the update form
 * @param {Object} post The post which is being updated
 * @example
 * ```js
 * displayUpdateForm(container, post);
 * ```
 */
export default function displayUpdateForm(container, post) {
    const { id, title, tags, body } = post;

    document.querySelector("h1").textContent = "Update post";
    container.innerHTML = "";
    //Title
    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "post-tags");
    titleLabel.setAttribute("class", "form-label");
    titleLabel.textContent = "Title:";
    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "post-title");
    titleInput.setAttribute("class", "form-control");
    titleInput.setAttribute("placeholder", "Title ...");
    titleInput.setAttribute("value", title.toString());
    const titleError = document.createElement("p");
    titleError.setAttribute("id", "title-error");
    titleError.setAttribute("class", "d-none m-0 text-danger");
    titleError.textContent = "Titles are required";
    const titleWrapper = document.createElement("div");
    titleWrapper.appendChild(titleLabel);
    titleWrapper.appendChild(titleInput);
    titleWrapper.appendChild(titleError);

    const titleIsValid = () => {
        return manage.input(validation.length(titleInput.value, 0), titleInput, titleError);
    };
    titleInput.addEventListener("blur", () => titleIsValid());

    //Tags
    const tagsLabel = document.createElement("label");
    tagsLabel.setAttribute("for", "post-tags");
    tagsLabel.setAttribute("class", "form-label");
    tagsLabel.textContent = "Tags:";
    const tagsInput = document.createElement("input");
    tagsInput.setAttribute("type", "text");
    tagsInput.setAttribute("id", "post-tags");
    tagsInput.setAttribute("class", "form-control");
    tagsInput.setAttribute("placeholder", "Add tag ...");

    const tagsBold = document.createElement("span");
    tagsBold.setAttribute("class", "fw-bold");
    tagsBold.textContent = "Tags: ";
    const tagList = document.createElement("span");
    tagList.setAttribute("id", "tag-list");
    tagList.setAttribute("class", "fst-italic");
    tagList.textContent = writeTags(tags);
    const tagsShowcase = document.createElement("p");
    tagsShowcase.appendChild(tagsBold);
    tagsShowcase.appendChild(tagList);

    const addTagBtn = document.createElement("button");
    addTagBtn.setAttribute("type", "button");
    addTagBtn.setAttribute("class", "btn btn-primary me-1");
    addTagBtn.textContent = "Add tags";
    const currentTags = new Set(tags);
    addTagBtn.addEventListener("click", () => manage.tags(currentTags, tagsInput.value.trim(), tagList));

    const removeTags = document.createElement("button");
    removeTags.setAttribute("type", "button");
    removeTags.setAttribute("class", "btn btn-primary");
    removeTags.textContent = "Remove tags";
    removeTags.addEventListener("click", () => manage.tags(currentTags, null, tagList, false));

    const tagsWrapper = document.createElement("div");
    tagsWrapper.setAttribute("class", "my-3");
    tagsWrapper.appendChild(tagsLabel);
    tagsWrapper.appendChild(tagsInput);
    tagsWrapper.appendChild(tagsShowcase);
    tagsWrapper.appendChild(addTagBtn);
    tagsWrapper.appendChild(removeTags);

    //Body
    const bodyLabel = document.createElement("label");
    bodyLabel.setAttribute("for", "post-body");
    bodyLabel.setAttribute("class", "form-label");
    bodyLabel.textContent = "Content:";
    const bodyInput = document.createElement("textarea");
    bodyInput.setAttribute("type", "text");
    bodyInput.setAttribute("id", "post-body");
    bodyInput.setAttribute("class", "form-control");
    bodyInput.setAttribute("placeholder", "Content ...");
    bodyInput.textContent = body ? body.toString() : "";
    const bodyWrapper = document.createElement("div");
    bodyWrapper.appendChild(bodyLabel);
    bodyWrapper.appendChild(bodyInput);

    //Form
    const formBtn = document.createElement("button");
    formBtn.setAttribute("type", "submit");
    formBtn.setAttribute("class", "w-100 mt-3 btn btn-secondary");
    formBtn.textContent = "Update post";

    const updateForm = document.createElement("form");
    updateForm.setAttribute("id", "update-post");
    updateForm.appendChild(titleWrapper);
    updateForm.appendChild(tagsWrapper);
    updateForm.appendChild(bodyWrapper);
    updateForm.appendChild(formBtn);
    const formFeedback = document.createElement("p");
    formFeedback.setAttribute("class", "d-none text-danger");
    formFeedback.textContent = "Please review feedback";
    const commentsWrapper = document.querySelector(".comments-wrapper");
    updateForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        formFeedback.classList.remove("d-none");
        if (titleIsValid()) {
            formFeedback.setAttribute("class", "fst-italic");
            formFeedback.textContent = "Loading ...";
            const { baseUrl, publish: publishPost, fetch: fetchApi, createAuthOptions } = (await import("../api/index.mjs")).default;
            const response = await publishPost("PUT", titleInput.value, bodyInput.value, currentTags, id);
            if (response.status === 200) {
                post = await fetchApi(`${baseUrl}/posts/${id}?_author=true&_comments=true`, createAuthOptions(), true);
                commentsWrapper.classList.remove("d-none");
                display.post(container, post);
            } else {
                formFeedback.setAttribute("class", "text-danger");
                formFeedback.textContent = "Something went wrong when trying to update your post.";
            }
        }
    });

    container.appendChild(updateForm);
    container.appendChild(formFeedback);

    //Close update form
    const closeIcon = document.createElement("img");
    closeIcon.setAttribute("src", "/img/icon/close-icon.png");
    closeIcon.setAttribute("alt", "Close icon");
    closeIcon.setAttribute("class", "w-100");

    const closeIconWrapper = document.createElement("div");
    closeIconWrapper.setAttribute("class", "category-icon");
    closeIconWrapper.appendChild(closeIcon);

    const closeBtn = document.createElement("button");
    closeBtn.setAttribute("type", "button");
    closeBtn.setAttribute("id", "close-update-post");
    closeBtn.setAttribute("class", "btn btn-link p-3 me-3");
    closeBtn.addEventListener("click", () => {
        commentsWrapper.classList.remove("d-none");
        display.post(container, post);
    });
    closeBtn.appendChild(closeIconWrapper);

    const btnControls = document.querySelector(".btn-controls");
    btnControls.innerHTML = "";
    btnControls.appendChild(closeBtn);
}
