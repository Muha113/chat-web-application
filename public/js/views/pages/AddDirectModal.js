import {closeModal} from "../../services/modalService.js"

let AddDirectModal = {
    render: async () => {
        let view = `
                    <form id="add-direct-form" class="modal-add-direct">
                        <input id="add-direct-input" name="username" type="text" class="modal-add-direct-input" placeholder="username" required>
                        <input id="add-direct-btn" name="sbmt" type="submit" class="modal-add-direct-button" value="Add">
                    </form>`
        return view
    },
    after_render: async () => {
        const addBtn = document.getElementById("add-direct-btn")
        const addInput = document.getElementById("add-direct-input")

        addBtn.addEventListener("click", (event) => {
            // add to firebase new user chat and add it to directMsgList html
            alert("Direct added success")
            closeModal()
        })
    }
}

export default AddDirectModal