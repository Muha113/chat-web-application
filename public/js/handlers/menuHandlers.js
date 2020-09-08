import { firebaseService } from "../services/index.js"
import * as chatMenu from "../components/chatsMenu.js"

export async function uploadInitDirect(directList, directChats) {
    for (const id of directChats) {
        const chatData = await firebaseService.getChatById(id)
        console.log(chatData)
        directList.innerHTML += chatMenu.directMessages(
            id, 
            chatData.chatName, 
            0
        )
    }
}

export async function addChatToMenu(directList, chatId) {
    const chatData = await firebaseService.getChatById(chatId)
    directList.innerHTML += chatMenu.directMessages(
        chatId,
        chatData.chatName,
        0
    )
}