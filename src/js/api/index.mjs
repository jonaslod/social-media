import fetch from "./fetchApi.mjs";
import createAuthOptions from "./createAuthenticatedOptions.mjs";
import publish from "./publishPost.mjs";

export default {
    baseUrl: "https://api.noroff.dev/api/v1/social",
    fetch,
    createAuthOptions,
    publish,
};
