import { firebaseService } from "../services/index.js"
import * as chatMenu from "../components/chatsMenu.js"

export async function uploadInitDirect(directList, directChats) {
    if (directChats != null) {
        for (const id of directChats) {
            const chatData = await firebaseService.getChatById(id)
            console.log(chatData)
            directList.innerHTML += chatMenu.directMessages(
                id, 
                chatData.name, 
                0
            )
        }
    }
}

export async function addChatToMenu(directList, chatId) {
    const chatData = await firebaseService.getChatById(chatId)
    if (chatData != null) {
        directList.innerHTML += chatMenu.directMessages(
            chatId,
            chatData.chatName,
            0
        )
    } else {
        alert("menuHandlers.js : 27 -> no such chatId")
    }
}