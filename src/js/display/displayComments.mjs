import components from "../components/index.mjs";
import validate from "../validation/index.mjs";
import display from "./index.mjs";

/**
 * This will create HTML elements for an array of comment objects
 * @param {*} container The container which the function appends the comments
 * @param {Object[]} comments Array of comments
 * @example
 * ```js
 * displayComments(commentsWrapper, comments);
 * ```
 */
export default function displayComments(container, comments) {
    comments.forEach(({ body, owner, created }) => {
        //Profile icon
        const profileIcon = document.createElement("div");
        profileIcon.setAttribute("class", "contact-icon me-2 d-flex align-items-center justify-content-center");
        profileIcon.appendChild(display.profileIcon(false, owner));

        //Profile name
        const commenter = document.createElement("span");
        commenter.setAttribute("class", "fw-bold");
        commenter.textContent = owner;
        const commenterSays = document.createElement("span");
        commenterSays.textContent = " says:";

        const commenterWrapper = document.createElement("p");
        commenterWrapper.setAttribute("class", "m-0");
        commenterWrapper.appendChild(commenter);
        commenterWrapper.appendChild(commenterSays);

        //Upload date
        const commentDate = document.createElement("p");
        commentDate.setAttribute("class", "m-0");
        commentDate.textContent = `(${components.formatDate(created)})`;

        //Profile details (Profile name and upload date)
        const commenterDetails = document.createElement("div");
        commenterDetails.appendChild(commenterWrapper);
        commenterDetails.appendChild(commentDate);

        //Profile (details and contact icon)
        const commentDetails = document.createElement("a");
        commentDetails.setAttribute("class", "text-decoration-none text-black d-flex align-items-center border-bottom p-2 pb-3");
        commentDetails.setAttribute("href", `/profile/?name=${owner}`);
        commentDetails.appendChild(profileIcon);
        commentDetails.appendChild(commenterDetails);

        //Post content (body)
        const commentContent = document.createElement("p");
        commentContent.setAttribute("class", "fst-italic m-0 p-2");
        commentContent.textContent = validate.defined(body, "post content");

        const commentWrapper = document.createElement("div");
        commentWrapper.setAttribute("class", "p-2 my-3 border border-dark rounded");
        commentWrapper.appendChild(commentDetails);
        commentWrapper.appendChild(commentContent);

        container.appendChild(commentWrapper);
    });
}
