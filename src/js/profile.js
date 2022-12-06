import storage from "./storage/index.mjs";

if (storage.getParameterString("logout")) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");
    window.location.replace("/login");
} else {
    const {
        posts: displayPosts,
        profileIcon: displayProfileIcon,
        error: displayError,
        following: displayFollowing,
    } = (await import("./display/index.mjs")).default;
    try {
        const { tags: manageTags, input: manageInput, responseCodes: manageResponseCodes } = (await import("./manage/index.mjs")).default;
        const { baseUrl, fetch: fetchApi, publish: publishPost, createAuthOptions } = (await import("./api/index.mjs")).default;
        const queryStringUsername = storage.getParameterString("name");
        const localStorageUsername = storage.getLocalStorage("name");
        const url = `${baseUrl}/profiles/${queryStringUsername ? queryStringUsername : localStorageUsername}`;
        const response = await fetchApi(`${url}?_posts=true&_following=true&_followers=true`);

        if (response.status === 200) {
            const postContainer = document.querySelector(".post-container");
            const { defined: validateDefined, length: validateLength } = (await import("./validation/index.mjs")).default;
            const { name, posts, avatar, following, followers } = await response.json();

            //----Remove loading
            document.querySelector(".loading").innerHTML = "";
            document.querySelector(".profile-wrapper").setAttribute("class", "block");

            //----Display posts
            if (posts.length > 0) {
                displayPosts(postContainer, posts, true, avatar);
            }

            //--Display following
            document.querySelector("#contacts h2").textContent = "Following" + (following.length > 0 ? ` (${following.length})` : "");
            displayFollowing(document.getElementById("following"), following);

            //--Display user details
            document.title = `${name} | DuckIt`;
            document.querySelector("#details h1").textContent = validateDefined(name, "name");

            if (avatar) {
                const profileIconWrapper = document.querySelector(".profile-icon");
                profileIconWrapper.innerHTML = "";
                profileIconWrapper.appendChild(displayProfileIcon(avatar, name));
            }

            //----Search param functionality
            document.getElementById("search-form").addEventListener("submit", (event) => {
                event.preventDefault();
                window.location.replace(`/?search=${document.getElementById("search-in-posts").value}`);
            });

            if (name === localStorageUsername) {
                document.getElementById("follow-user-wrapper").innerHTML = "";
                document.getElementById("post").classList.remove("d-none");
                const bodyInput = document.getElementById("post-body");
                const tagList = document.getElementById("tag-list");
                const tagInput = document.getElementById("post-tags");
                const postTags = new Set();
                document.getElementById("add-tag").addEventListener("click", () => manageTags(postTags, tagInput.value.trim(), tagList));
                document.getElementById("remove-tags").addEventListener("click", () => manageTags(postTags, tagInput.value.trim(), tagList, false));

                const titleInput = document.getElementById("post-title");
                const titleIsValid = () => {
                    return manageInput(validateLength(titleInput.value, 0), titleInput, document.getElementById("title-error"));
                };
                titleInput.addEventListener("blur", () => {
                    titleIsValid();
                });

                const formFeedback = document.querySelector(".form-feedback");
                document.getElementById("publish-post").addEventListener("submit", async (event) => {
                    event.preventDefault();
                    formFeedback.classList.remove("d-none");
                    if (titleIsValid()) {
                        formFeedback.setAttribute("class", "fst-italic");
                        formFeedback.textContent = "Loading ...";
                        const response = await publishPost("POST", titleInput.value, bodyInput.value, postTags);
                        if (response.status === 200) {
                            formFeedback.setAttribute("class", "text-success");
                            formFeedback.textContent = "Post successfully published to wall!";
                            const updatedPosts = await fetchApi(`${url}/posts?_author=true`, createAuthOptions(), true);
                            displayPosts(postContainer, updatedPosts);
                        } else {
                            formFeedback.setAttribute("class", "text-danger");
                            formFeedback.textContent = "Something went wrong when trying to publish your post.";
                        }
                    }
                });
            } else {
                const followIcon = document.getElementById("following-icon");
                let isFollowing = followers.some(({ name }) => name === localStorageUsername);
                if (isFollowing) {
                    followIcon.src = "../img/icon/heart-full.png";
                }
                document.getElementById("follow-user").addEventListener("click", async (event) => {
                    const followBtn = event.currentTarget;
                    followBtn.disabled = true;
                    const followUrl = isFollowing ? `${url}/unfollow` : `${url}/follow`;
                    const followResp = await fetchApi(`${followUrl}`, createAuthOptions("PUT"));
                    if (followResp.status === 200) {
                        isFollowing = isFollowing ? false : true;
                        followIcon.src = isFollowing ? "../img/icon/heart-full.png" : "../img/icon/heart-empty.png";
                        followBtn.disabled = false;
                    }
                });
            }
        } else {
            manageResponseCodes(response.status);
        }
    } catch (error) {
        displayError("While trying to fetch the profile.");
    }
}
