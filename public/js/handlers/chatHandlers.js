import * as chatWindow from "../components/chatWindow.js"
import {firebaseService} from "../services/index.js"

export function innerMessage(snapshot, currentUsersStateId, elem) {
    console.log("message recieved -> user chat id: " + currentUsersStateId + ", message chat id: " + snapshot.val().chatId)
    if (currentUsersStateId == snapshot.val().chatId) {
        elem.innerHTML += chatWindow.firstMessage(
            snapshot.val().username,
            snapshot.val().time,
            snapshot.val().text
        )
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
    for (const msg of messages) {
        chatMsgList.innerHTML += chatWindow.firstMessage(
            msg[msg.id].username,
            msg[msg.id].time,
            msg[msg.id].text
        )
    }
}