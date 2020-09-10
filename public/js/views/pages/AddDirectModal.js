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
            const users = await firebaseService.getAllUsers()
            console.log(users)
            const searchUsernameText = addDirectForm.elements["username"].value
            const currentUsername = firebase.auth().currentUser.displayName

            const userChatsNames = await firebaseService.getUserChatsNames(firebase.auth().currentUser.uid)
            if (userChatsNames != null) {
                console.log(userChatsNames)
                for (let i = 0; i < userChatsNames.length; i++) {
                    const splited = userChatsNames[i].split("$")
                    Utils.removeElemFromArray(splited, currentUsername)
                    userChatsNames[i] = splited[0]
                    console.log(userChatsNames[i])
                }
                if (userChatsNames.includes(searchUsernameText)) {
                    alert("This chat already exists!")
                    return
                }
            }

            for (const user of users) {
                const name = user[user.id].username
                if (name == searchUsernameText && name != currentUsername) {
                    const key = await firebaseService.createChat(
                        "direct",
                        currentUsername + "$" + name,
                        false,
                        ""
                    )
                    await firebaseService.addChatToUser(firebase.auth().currentUser.uid, key)
                    await firebaseService.addChatToUser(user.id, key)
                    alert("Add new chat with \"" + name + "\" success")
                    closeModal()
                    return
                }
            }
            alert("There is no such username")
            closeModal()
        })
    }
}

export default AddDirectModal