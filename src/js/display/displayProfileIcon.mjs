/**
 * Creates a profile icon for a specific user
 * @param {string} src Profile icon link
 * @param {string} name Name of profile
 * @returns {*} Newly created profile icon
 * @example
 * ```js
 * displayProfileIcon(author.avatar, author.name);
 * ```
 */
export default function displayProfileIcon(src, name) {
    const profileIcon = document.createElement("img");
    profileIcon.setAttribute("src", src ? src : "/img/icon/profile-icon.png");
    profileIcon.setAttribute("alt", `${name} profile icon`);
    profileIcon.setAttribute("class", "mw-100 mh-100");
    return profileIcon;
}
