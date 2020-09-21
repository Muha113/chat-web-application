import { firebaseService } from "../../services/index.js"
import { closeModal } from "../../services/modalService.js"
import Utils from "../../services/Utils.js"

let ChangeAvatarModal = {
    render: async () => {
        const currentAvatarUrl = Utils.getUrlFromImgAbsUrl(document.getElementById("user-header-photo").style.backgroundImage) 
        let view = `
                    <div class="change-avatar-block">
                        <img id="avatar-preview" src="${currentAvatarUrl}" class="avatar-img-preview" alt="">
                        <form id="change-avatar">
                            <input id="select-avatar" name="choose-file" class="avatar-input-file" type="file">
                            <input name="sbmt" class="avatar-input-save" type="submit" value="Save">
                        </form>
                    </div>`

        return view
    },
    after_render: async () => {
        const changeAvatarForm = document.getElementById("change-avatar")
        const selectAvatarInput = document.getElementById("select-avatar")
        const avatarPreviewImg = document.getElementById("avatar-preview")

        changeAvatarForm.addEventListener("submit", async (event) => {
            event.preventDefault()

            console.log(changeAvatarForm.elements["choose-file"].files[0])

            const file = changeAvatarForm.elements["choose-file"].files[0]
            const userId = firebase.auth().currentUser.uid
            const metadata = {
                contentType: file.type
            }

            await firebaseService.changeUserAvatar(userId, file, metadata)

            closeModal()
        })

        selectAvatarInput.addEventListener("change", (event) => {            
            const files = event.target.files
            if (FileReader && files && files.length) {
                var fr = new FileReader();
                fr.onload = function () {
                    avatarPreviewImg.src = fr.result;
                }
                fr.readAsDataURL(files[0]);
            } else {
                alert("Not supporting FileReader")
            }        
        })
    }
}

export default ChangeAvatarModal