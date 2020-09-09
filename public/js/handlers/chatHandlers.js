import * as chatWindow from "../components/chatWindow.js"
import {firebaseService} from "../services/index.js"

export function innerMessage(snapshot, currentUsersStateId, elem) {
    console.log("message recieved -> user chat id: " + currentUsersStateId + ", message chat id: " + snapshot.chatId)
    if (currentUsersStateId == snapshot.chatId) {
        console.log(snapshot.type)
        if (snapshot.type == "text") {
            elem.innerHTML += chatWindow.firstMessage(
                snapshot.username,
                snapshot.time,
                snapshot.text
            )
        } else if (snapshot.type == "sticker") {
            elem.innerHTML += chatWindow.stickerMessage(
                snapshot.username,
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
            innerMessage(msg[msg.id], newChatId, chatMsgList)
        }
    }
}