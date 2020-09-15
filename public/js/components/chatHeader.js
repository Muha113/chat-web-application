import {presentModal} from "../services/modalService.js"
import ChangeAvatarModal from "../views/pages/ChangeAvatarModal.js"
import ChangeUsernameModal from "../views/pages/ChangeUsernameModal.js"

let UserHeader = {
    render: async (username) => {
        let header = `
                    <button id="user-header-photo" class="photo"></button>
                    <button id="user-header-username" class="name">
                        <span id="username-header-span" class="username-span"></span>
                    </button>`
        return header
    },
    after_render: async () => {
        const photoButton = document.getElementById("user-header-photo")
        const usernameButton = document.getElementById("user-header-username")
        const usernameSpan = document.getElementById("username-header-span")

        photoButton.addEventListener("click", async () => {
            await presentModal(ChangeAvatarModal)
        })

        usernameButton.addEventListener("click", async () => {
            await presentModal(ChangeUsernameModal)
        })

        firebase.database().ref("/users/" + firebase.auth().currentUser.uid + "/avatarUrl").on("value", (snapshot) => {
            photoButton.style.backgroundImage = "url(\"" + snapshot.val() + "\")"
        })

        firebase.database().ref("/users/" + firebase.auth().currentUser.uid + "/username").on("value", (snapshot) => {
            usernameSpan.textContent = snapshot.val()
        })
    }
}

export default UserHeader