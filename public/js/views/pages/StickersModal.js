import {closeModal} from "../../services/modalService.js"
import {currentUserState} from "../../services/currentUserState.js"
import {firebaseService} from "../../services/index.js"
import Message from "../../models/message.js"
import Utils from "../../services/Utils.js"

let StickersModal = {
    render: async () => {
        let view = `
                    <div id="stickers" class="stickers-grid">
                        ${innerStickers()}
                    </div>`
        return view
    },
    after_render: async () => {
        const stickersGrid = document.getElementById("stickers")

        stickersGrid.addEventListener("click", (event) => {
            if (event.target.nodeName === "BUTTON") {
                console.log(event.target.style)
                const imgUrlFull = event.target.style.backgroundImage
                const imgUrl = Utils.getUrlFromImgAbsUrl(imgUrlFull)

                const message = new Message(
                    currentUserState.id,
                    "sticker",
                    firebase.auth().currentUser.uid,
                    true, 
                    imgUrl,
                    "11:50"
                )
                firebaseService.createMessage(message)
                closeModal()
            }
        }) 
    }
}

function innerStickers() {
    let view = ``
    for (let i = 1; i <= 16; i++) {
        view += `<button class="sticker" style="background-image: url(../img/stickers/sticker${i}.png)"></button>`
    }
    return view
}

export default StickersModal