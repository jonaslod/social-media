/**
 * Manages the state (login / register) of the form on the login page
 * @param {boolean} isLoggingIn If the user is logging in or registering an account
 * @param {*} usernameInput Username input
 * @param {*} btnRegister Button used for switching state of the form
 * @param {*} btnSignIn Button used for submitting the form
 * @returns {boolean} Which state the form is now
 * @example
 * ```js
 * btnRegister.addEventListener("click", () => {
 *      isLoggingIn = manageLoginForm(isLoggingIn, usernameInput, btnRegister, btnSignIn);
 * });
 * ```
 */
export default function manageLoginForm(isLoggingIn, usernameInput, btnRegister, btnSignIn) {
    const heading = document.querySelector("h1");
    const usernameWrapper = usernameInput.parentElement;
    if (isLoggingIn) {
        usernameWrapper.classList.remove("d-none");
        btnRegister.textContent = "Back to login";
        btnSignIn.textContent = "Register account";
        heading.textContent = "Create an account";
        usernameInput.required = true;
        return false;
    }
    usernameWrapper.classList.add("d-none");
    usernameInput.required = false;
    btnRegister.textContent = "Register an account";
    btnSignIn.textContent = "Sign in";
    heading.textContent = "Sign in to DuckIt";
    return true;
}
