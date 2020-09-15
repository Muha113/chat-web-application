import * as chatWindow from "../components/chatWindow.js"
import {firebaseService} from "../services/index.js"
import Utils from "../services/Utils.js"
import {incrementMessagesUnread} from "../helpers/elementHelper.js"

export async function innerMessage(msgId, snapshot, currentUserState, elem) {
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
                snapshot.text,
                msgId,
                snapshot.isRead
            )
        } else if (snapshot.type == "sticker") {
            elem.innerHTML += chatWindow.stickerMessage(
                username,
                userAvatarUrl,
                messageTime,
                snapshot.text,
                msgId,
                snapshot.isRead
            )
        }

        if (firebase.auth().currentUser.uid != snapshot.userId) {
            firebase.database().ref("/chat/" + snapshot.chatId + "/messages/" + msgId + "/isRead").set(true)
        }
        
    } else {
        if (firebase.auth().currentUser.uid != snapshot.userId && !snapshot.isRead) {
            const btnId = snapshot.chatId
            const btn = document.getElementById(btnId)

            if (btn) {
                const unreadMsgsElement = btn.parentNode.querySelector(".count-unread-messages")
                incrementMessagesUnread(unreadMsgsElement)
            }
        }
    }
}

export async function setCurrentChat(newChatId, currentUserState) {
    const chatMsgList = document.getElementById("chat-messages")
    chatMsgList.innerHTML = ""

    const messages = await firebaseService.getChatMessages(newChatId)

    if (messages != null) {
        messages.sort((a, b) => {
            return a[a.id].time > b[b.id].time
        })    

        currentUserState.id = newChatId
        const currentUserId = firebase.auth().currentUser.uid

        for (const msg of messages) { 
            if (!msg[msg.id].isRead && msg[msg.id].userId != currentUserId) {
                firebase.database().ref("/chat/" + newChatId + "/messages/" + msg.id + "/isRead").set(true)
                msg[msg.id].isRead = true
            }

            await innerMessage(msg.id, msg[msg.id], currentUserState, chatMsgList)
        }
    }
}