import {searchChatsListItem} from "../components/searchChats.js"
import {firebaseService} from "../services/index.js"

export async function searchChats(searchText, chatMsgList) {
    let chats = await firebaseService.getAllChats()
    let userChats = await firebaseService.getUserChats(firebase.auth().currentUser.uid)
    console.log(userChats)
    for (const chat of chats) {
        console.log(chat.id + " -> " + userChats.includes(chat.id))
        const chatObj = chat[chat.id]
        if (chatObj.type == "channel") {
            chatMsgList.innerHTML += searchChatsListItem(
                chat.id,
                chat[chat.id].name,
                chat[chat.id].private,
                chat[chat.id].members,
                userChats.includes(chat.id)
            )
        }
    }
} 