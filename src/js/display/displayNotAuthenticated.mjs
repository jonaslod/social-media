/**
 * This will display a message to the user, detailing how they are not authenticated to view the page
 * @param {HTMLMainElement} [container=document.querySelector("main")] Container which will contain the message
 * @example
 * ```js
 * displayNotAuthenticated();
 * ```
 */
export default function displayNotAuthenticated(container = document.querySelector("main")) {
    const errorMessage = document.createElement("p");
    errorMessage.setAttribute("class", "text-danger fst-italic");
    errorMessage.textContent = "You are not authenticated to view this webpage. You can ";
    const linkToLogin = document.createElement("a");
    linkToLogin.setAttribute("href", "/login");
    linkToLogin.setAttribute("class", "text-info");
    linkToLogin.textContent = "sign in";
    errorMessage.append(linkToLogin, " to be authenticated.");
    const heading = document.createElement("h1");
    heading.textContent = "Not authenticated";
    container.innerHTML = "";
    container.append(heading, errorMessage);
}
