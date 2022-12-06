import api from "./api/index.mjs";
import display from "./display/index.mjs";
import storage from "./storage/index.mjs";
import manage from "./manage/index.mjs";

try {
    const url = `${api.baseUrl}/posts`;
    const id = storage.getParameterString("id");
    const response = await api.fetch(`${url}/${id}?_author=true&_comments=true`);

    //----Search param functionality
    document.getElementById("search-form").addEventListener("submit", (event) => {
        event.preventDefault();
        window.location.replace(`/?search=${document.getElementById("search-in-posts").value}`);
    });

    if (response.status === 200) {
        const commentsWrapper = document.getElementById("comments");
        const commentInput = document.getElementById("comment-body");
        const formFeedback = document.querySelector(".form-feedback");
        const post = await response.json();
        const comments = post.comments;

        display.post(document.querySelector(".post-container"), post);

        if (comments.length > 0) {
            commentsWrapper.innerHTML = "";
            display.comments(commentsWrapper, comments);
        }
        document.querySelector(".comments-wrapper").classList.remove("d-none");

        //----Publish comment
        const commentIsValid = async () => {
            const { length: validateLength } = (await import("./validation/index.mjs")).default;
            return manage.input(validateLength(commentInput.value.trim(), 0), commentInput, document.getElementById("comment-error"));
        };
        commentInput.addEventListener("blur", () => commentIsValid());

        document.getElementById("publish-comment").addEventListener("submit", async (event) => {
            event.preventDefault();
            formFeedback.classList.remove("d-none");
            if (await commentIsValid()) {
                formFeedback.setAttribute("class", "fst-italic");
                formFeedback.textContent = "Loading ...";
                const options = api.createAuthOptions("POST", { body: commentInput.value.trim() });
                const response = await api.fetch(`${url}/${id}/comment`, options);
                if (response.status === 200) {
                    formFeedback.setAttribute("class", "text-success");
                    formFeedback.textContent = "Comment published!";
                    commentInput.value = "";
                    const updatedComments = await api.fetch(`${url}/${id}?_comments=true`, api.createAuthOptions(), true);
                    commentsWrapper.innerHTML = "";
                    display.comments(commentsWrapper, updatedComments.comments);
                } else {
                    formFeedback.setAttribute("class", "text-danger");
                    formFeedback.textContent = "Something went wrong when trying to publish your post.";
                }
            }
        });
    } else {
        manage.responseCodes(response.status);
    }
} catch (error) {
    display.error("While trying to fetch the post.");
}
