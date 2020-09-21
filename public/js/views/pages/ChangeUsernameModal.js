import { firebaseService } from "../../services/index.js"
import { closeModal } from "../../services/modalService.js"

let ChangeUsernameModal = {
    render: async () => {
        const currentUsername = document.getElementById("username-header-span").textContent
        let view = `
                    <form id="change-username-form" class="change-username-block">
                        <input name="username-input" class="username-input-text" type="text" value="${currentUsername}" required>
                        <input name="username-save" class="username-input-save" type="submit" value="Save">
                    </form>`

        return view
    },
    after_render: async () => {
        const changeUsernameForm = document.getElementById("change-username-form")

        changeUsernameForm.addEventListener("submit", async (event) => {
            event.preventDefault()

            const newUsername = changeUsernameForm.elements["username-input"].value
            await firebaseService.changeUserUsername(firebase.auth().currentUser.uid, newUsername)

            closeModal()
        })
    }
}

export default ChangeUsernameModal