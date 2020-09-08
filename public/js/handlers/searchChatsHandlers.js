import {searchChatsListItem} from "../components/searchChats.js"
import {firebaseService} from "../services/index.js"

export async function searchChats(searchText, chatMsgList) {
    let chats = await firebaseService.getAllChats()
    let userChats = await firebaseService.getUserChats()
    console.log(userChats)
    for (const chat of chats) {
        console.log(chat.id + " -> " + userChats.includes(chat.id))
        chatMsgList.innerHTML += searchChatsListItem(
            chat.id,
            chat[chat.id].chatName,
            true,
            chat[chat.id].members,
            userChats.includes(chat.id)
        )
    }
} 