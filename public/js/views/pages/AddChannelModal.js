import {closeModal} from "../../services/modalService.js"
import { firebaseService } from "../../services/index.js"

let AddChannelModal = {
    render: async () => {
        let view = `
                    <form id="add-channel-form" class="modal-add-channel">
                        <input name="chan-name" class="form-input" type="text" placeholder="channel name" required>
                        <div class="form-radiobuttons">
                            <p><input name="chan-type" class="radiobutton" type="radio" checked value="public">Public</p>
                            <p><input id="add-channel-private-radiobutton" name="chan-type" class="radiobutton" type="radio" value="private">Private</p>
                        </div>
                        <input name="pass" class="form-input" type="password" placeholder="password" disabled required>
                        <input name="sbmt" class="submit-button" type="submit" value="Create">
                    </form>`
        return view
    },
    after_render: async () => {
        const addChannelForm = document.getElementById("add-channel-form")
        const privateRadiobutton = document.getElementById("add-channel-private-radiobutton")

        addChannelForm.addEventListener("submit", async (event) => {
            event.preventDefault()

            const newChannelName = addChannelForm.elements["chan-name"].value
            const isPrivate = addChannelForm.elements["chan-type"].value != "public"
            const passwd = isPrivate ? addChannelForm.elements["pass"].value : ""
            const names = await firebaseService.getAllChannelsNames()
            if (!names.includes(newChannelName)) {
                const key = await firebaseService.createChat(
                    "channel",
                    newChannelName,
                    isPrivate,
                    passwd,
                )

                await firebaseService.addChatToUser(firebase.auth().currentUser.uid, key)

                alert("Channel added success")
                closeModal()
                return
            }
            alert("This channel name is already used")
            closeModal()
        })

        addChannelForm.addEventListener("change", (event) => {
            if (event.target.name == "chan-type") {
                if (event.target.value == "private") {
                    addChannelForm.elements["pass"].disabled = false
                } else {
                    addChannelForm.elements["pass"].disabled = true
                }
            }
        })
    }
}

export default AddChannelModal