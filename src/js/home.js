import api from "./api/index.mjs";
import display from "./display/index.mjs";
import manage from "./manage/index.mjs";

try {
    const url = `${api.baseUrl}/posts?limit=50&_author=true`;
    const response = await api.fetch(url);

    if (response.status === 200) {
        let formIsOpen = true;
        const postContainer = document.querySelector(".post-container");
        const closeFormBtn = document.querySelector(".close-form");
        const titleInput = document.getElementById("post-title");
        const tagList = document.getElementById("tag-list");
        const formFeedback = document.querySelector(".form-feedback");
        const filterSelect = document.getElementById("filter-by");
        const searchInput = document.getElementById("search");
        const tagInput = document.getElementById("post-tags");
        const loadMore = document.getElementById("load-more-posts");
        let posts = await response.json();

        //----Remove loading and close form button
        document.querySelector(".loading").innerHTML = "";
        document.querySelector(".post-wrapper").setAttribute("class", "block");

        closeFormBtn.addEventListener("click", () => {
            formIsOpen = formIsOpen ? false : true;
            document.getElementById("publish-post").style.display = formIsOpen ? "block" : "none";
            closeFormBtn.textContent = formIsOpen ? "Close form" : "Open form";
        });

        //----Initial posts
        const { getParameterString } = (await import("./storage/index.mjs")).default;
        const searchParam = getParameterString("search");
        if (searchParam) {
            handleFiltering(searchParam.trim());
            searchInput.value = searchParam.trim();
        } else {
            display.posts(postContainer, posts);
        }

        //----Load more posts
        loadMore.classList.remove("d-none");
        loadMore.addEventListener("click", async () => {
            const newPosts = await api.fetch(`${url}&offset=${posts.length}`, api.createAuthOptions(), true);
            posts = [...posts, ...newPosts];
            display.posts(postContainer, posts);
        });

        //----Filtering of posts
        filterSelect.addEventListener("change", () => handleFiltering());

        document.getElementById("search-by").addEventListener("submit", (event) => {
            event.preventDefault();
            handleFiltering();
        });

        async function handleFiltering(queryString = "") {
            loadMore.classList.add("d-none");
            const filteredPosts = await manage.postFiltering([...posts], filterSelect.value, searchInput.value, queryString);
            if (filteredPosts.length > 0) {
                display.posts(postContainer, filteredPosts);
                loadMore.classList.remove("d-none");
            } else {
                postContainer.textContent = "No posts were found";
            }
        }

        //----Post publishing
        const titleIsValid = async () => {
            const { length: validateLength } = (await import("./validation/index.mjs")).default;
            return manage.input(validateLength(titleInput.value, 0), titleInput, document.getElementById("title-error"));
        };
        titleInput.addEventListener("blur", () => titleIsValid());

        const tags = new Set();
        document.getElementById("add-tag").addEventListener("click", () => manage.tags(tags, tagInput.value.trim(), tagList));
        document.getElementById("remove-tags").addEventListener("click", () => manage.tags(tags, tagInput.value.trim(), tagList, false));

        document.getElementById("publish-post").addEventListener("submit", async (event) => {
            event.preventDefault();
            formFeedback.classList.remove("d-none");
            if (await titleIsValid()) {
                formFeedback.setAttribute("class", "fst-italic");
                formFeedback.textContent = "Loading ...";
                const response = await api.publish("POST", titleInput.value, document.getElementById("post-body").value, tags);
                if (response.status === 200) {
                    formFeedback.setAttribute("class", "text-success");
                    formFeedback.textContent = "Post published!";
                    const updatedPosts = await api.fetch(url, api.createAuthOptions(), true);
                    display.posts(postContainer, updatedPosts);
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
    display.error("While trying to fetch the posts.");
}
