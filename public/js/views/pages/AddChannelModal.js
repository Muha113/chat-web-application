import {closeModal} from "../../services/modalService.js"

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
        const addChanelForm = document.getElementById("add-channel-form")
        const privateRadiobutton = document.getElementById("add-channel-private-radiobutton")

        addChanelForm.addEventListener("submit", (event) => {
            event.preventDefault()
            alert("Channel added success")
            closeModal()
        })

        addChanelForm.addEventListener("change", (event) => {
            if (event.target.name == "chan-type") {
                if (event.target.value == "private") {
                    addChanelForm.elements["pass"].disabled = false
                } else {
                    addChanelForm.elements["pass"].disabled = true
                }
            }
        })
    }
}

export default AddChannelModal