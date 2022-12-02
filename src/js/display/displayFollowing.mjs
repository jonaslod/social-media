import display from "./index.mjs";
export default function displayFollowing(container, users) {
    if (users.length > 0) {
        const showFollowers = (usersToDisplay) => {
            usersToDisplay.forEach(({ name, avatar }) => {
                const contactIcon = display.profileIcon(avatar, name);
                const contactIconWrapper = document.createElement("div");
                contactIconWrapper.appendChild(contactIcon);
                contactIconWrapper.setAttribute("class", "contact-icon d-flex align-items-center");

                const contactName = document.createElement("p");
                contactName.textContent = name;
                contactName.setAttribute("class", "my-0 ms-2");

                const contact = document.createElement("div");
                contact.setAttribute("class", "w-100 p-2 d-flex align-items-center border border-dark rounded");
                contact.appendChild(contactIconWrapper);
                contact.appendChild(contactName);

                const contactWrapper = document.createElement("a");
                contactWrapper.setAttribute("class", "col-12 col-sm-3 col-md-12 py-1 p-md-0 mb-md-2 text-decoration-none text-black");
                contactWrapper.setAttribute("href", `/profile/?name=${name}`);
                contactWrapper.appendChild(contact);

                container.appendChild(contactWrapper);
            });
        };

        showFollowers(users.splice(0, 4));

        if (users.length > 0) {
            container.lastChild.remove();
            const viewAll = document.createElement("button");
            viewAll.setAttribute("type", "button");
            viewAll.setAttribute("class", "w-100 h-100 p-2 text-decoration-none border border-dark rounded bg-secondary");
            viewAll.textContent = "View all >>";
            viewAll.addEventListener("click", (event) => {
                event.currentTarget.parentElement.remove();
                showFollowers(users);
            });
            const viewAllWrapper = document.createElement("div");
            viewAllWrapper.setAttribute("class", "col-12 col-sm-3 col-md-12 d-flex align-items-center justify-content-center py-1 p-md-0 mb-md-2");
            viewAllWrapper.appendChild(viewAll);
            container.appendChild(viewAllWrapper);
        }
    } else {
        container.textContent = "None";
    }
}
