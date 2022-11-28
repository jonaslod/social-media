/**
 * This will display an customizable error message to a container
 * @param {string} message The message which will be displayed
 * @param {*} [container=document.querySelector("main")] The container which will contain the error message
 * @example
 * ```js
 * displayError("While trying to fetch the profile.");
 * ```
 */
export default function displayError(message, container = document.querySelector("main")) {
    const heading = document.createElement("h1");
    heading.textContent = "An error ocurred!";

    const messageContainer = document.createElement("p");
    messageContainer.setAttribute("class", "text-danger fst-italic");
    messageContainer.textContent = message;

    container.innerHTML = "";
    container.appendChild(heading);
    container.appendChild(messageContainer);
}
