import * as chatWindow from "../components/chatWindow.js"
import {firebaseService} from "../services/index.js"
import Utils from "../services/Utils.js"

export async function innerMessage(snapshot, currentUserState, elem) {
    console.log("message recieved -> user chat id: " + currentUserState.id + ", message chat id: " + snapshot.chatId)
    if (currentUserState.id == snapshot.chatId) {
        // console.log(snapshot.type)
        // console.log(snapshot)
        const username = await firebaseService.getUsername(snapshot.userId)
        const userAvatarUrl = await firebaseService.getUserAvatarUrl(snapshot.userId)
        // console.log(snapshot.time)
        const messageDatetime = Utils.parseDatetime(snapshot.time)
        // console.log(messageDatetime)
        const messageDate = messageDatetime.toISOString().split("T")[0]
        const messageTime = messageDatetime.getHours() + ":" + messageDatetime.getMinutes()

        if (currentUserState.lastMsgDate != messageDate) {
            elem.innerHTML += chatWindow.dateSeparator(messageDate)
            currentUserState.lastMsgDate = messageDate
        }

        if (snapshot.type == "text") {
            elem.innerHTML += chatWindow.firstMessage(
                username,
                userAvatarUrl,
                messageTime,
                snapshot.text
            )
        } else if (snapshot.type == "sticker") {
            elem.innerHTML += chatWindow.stickerMessage(
                username,
                userAvatarUrl,
                messageTime,
                snapshot.text
            )
        }
    }
}

export async function setCurrentChat(newChatId, currentUserState) {
    // console.log("button handler detected, btn id : " + newChatId)
    const chatMsgList = document.getElementById("chat-messages")
    chatMsgList.innerHTML = ""

    const messages = await firebaseService.getChatMessages(newChatId)

    if (messages != null) {
        console.log("sorted messages")
        console.log(messages)

        messages.sort((a, b) => {
            return a[a.id].time < b[b.id].time
        })    

        console.log("unsorted messages")
        console.log(messages)

        currentUserState.id = newChatId

        for (const msg of messages) { 
            await innerMessage(msg[msg.id], currentUserState, chatMsgList)
        }
    }
}