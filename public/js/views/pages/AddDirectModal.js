import {closeModal} from "../../services/modalService.js"
import { firebaseService } from "../../services/index.js"
import Utils from "../../services/Utils.js"

let AddDirectModal = {
    render: async () => {
        let view = `
                    <form id="add-direct-form" class="modal-add-direct">
                        <input name="username" type="text" class="modal-add-direct-input" placeholder="username" required>
                        <input name="sbmt" type="submit" class="modal-add-direct-button" value="Add">
                    </form>`
        return view
    },
    after_render: async () => {
        const addDirectForm = document.getElementById("add-direct-form")

        addDirectForm.addEventListener("submit", async (event) => {
            event.preventDefault()

            const searchUsernameText = addDirectForm.elements["username"].value
            const currentUserId = firebase.auth().currentUser.uid

            const searchUserId = await firebaseService.getUserIdByUsername(searchUsernameText)
            if (searchUserId == null) {
                alert("There is no such user")
                return
            }
            
            const userChatsConnectedUsersId = await firebaseService.getUserChatsConnectedId(firebase.auth().currentUser.uid)
            if (userChatsConnectedUsersId != null) {
                for (let i = 0; i < userChatsConnectedUsersId.length; i++) {
                    Utils.removeElemFromArray(userChatsConnectedUsersId[i], currentUserId)
                }
                if (userChatsConnectedUsersId.includes([searchUserId])) {
                    alert("You already have chat with that user")
                    return
                }
            }

            const key = await firebaseService.createChat(
                "direct",
                [currentUserId, searchUserId],
                "$",
                false,
                ""
            )

            await firebaseService.addChatToUser(currentUserId, key)
            await firebaseService.addChatToUser(searchUserId, key)

            alert("Creation success")
            closeModal()
        })
    }
}

export default AddDirectModal