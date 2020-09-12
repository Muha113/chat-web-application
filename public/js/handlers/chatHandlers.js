import * as chatWindow from "../components/chatWindow.js"
import {firebaseService} from "../services/index.js"

export async function innerMessage(snapshot, currentUsersStateId, elem) {
    console.log("message recieved -> user chat id: " + currentUsersStateId + ", message chat id: " + snapshot.chatId)
    if (currentUsersStateId == snapshot.chatId) {
        // console.log(snapshot.type)
        console.log(snapshot)
        const username = await firebaseService.getUsername(snapshot.userId)
        const userAvatarUrl = await firebaseService.getUserAvatarUrl(snapshot.userId)
        if (snapshot.type == "text") {
            elem.innerHTML += chatWindow.firstMessage(
                username,
                userAvatarUrl,
                snapshot.time,
                snapshot.text
            )
        } else if (snapshot.type == "sticker") {
            elem.innerHTML += chatWindow.stickerMessage(
                username,
                userAvatarUrl,
                snapshot.time,
                snapshot.text
            )
        }
    }
}

export async function setCurrentChat(newChatId) {
    console.log("button handler detected, btn id : " + newChatId)
    let chatMsgList = document.getElementById("chat-messages")
    chatMsgList.innerHTML = ""
    let messages = await firebaseService.getChatMessages(newChatId)
    console.log("messages: {")
    console.log(messages)
    console.log("}")
    if (messages != null) {
        for (const msg of messages) {
            await innerMessage(msg[msg.id], newChatId, chatMsgList)
        }
    }
}