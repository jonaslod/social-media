import validation from "./validation/index.mjs";
import manage from "./manage/index.mjs";

try {
    let isLoggingIn = true;
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const btnRegister = document.getElementById("btnRegister");
    const signInForm = document.querySelector("form");
    const formFeedback = document.getElementById("form-feedback");

    usernameInput.addEventListener("blur", () => {
        manage.input(validation.length(usernameInput.value, 0), usernameInput, document.querySelector(".username-error"));
    });

    emailInput.addEventListener("blur", () => {
        manage.input(validation.email(emailInput.value), emailInput, document.querySelector(".email-error"));
    });

    passwordInput.addEventListener("blur", () => {
        manage.input(validation.length(passwordInput.value, 7), passwordInput, document.querySelector(".password-error"));
    });

    btnRegister.addEventListener("click", () => {
        formFeedback.textContent = "";
        isLoggingIn = manage.loginForm(isLoggingIn, document.getElementById("username"), btnRegister, document.getElementById("btnSignIn"));
    });

    signInForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        formFeedback.setAttribute("class", "fst-italic");
        formFeedback.textContent = "Loading ...";

        const { baseUrl } = (await import("./api/index.mjs")).default;
        let url = `${baseUrl}/auth/`;
        let body = {
            email: emailInput.value,
            password: passwordInput.value,
        };

        if (isLoggingIn) {
            url += "login";
        } else {
            url += "register";
            body["name"] = document.getElementById("username").value;
        }

        const options = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        };

        const response = await fetch(url, options);
        const { accessToken, name, errors } = await response.json();
        if (response.status === 200) {
            const { saveLocalStorage } = (await import("./storage/index.mjs")).default;
            saveLocalStorage("accessToken", accessToken);
            saveLocalStorage("name", name);
            window.location.replace(`${signInForm.action}?name=${name}`);
        } else if (response.status === 201) {
            formFeedback.classList.add("text-success");
            formFeedback.textContent = "Account registered!";
            passwordInput.value = "";
        } else {
            formFeedback.classList.add("text-danger");
            formFeedback.textContent = errors[0].message;
        }
    });
} catch (error) {
    const { error: displayError } = (await import("./display/index.mjs")).default;
    displayError("While trying to handle the login form");
}
