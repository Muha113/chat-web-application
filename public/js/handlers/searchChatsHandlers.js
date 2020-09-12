import {searchChatsListItem} from "../components/searchChats.js"
import {firebaseService} from "../services/index.js"
import { presentModal } from "../services/modalService.js"
import {addChatToMenu} from "../handlers/menuHandlers.js"

export async function addChat(channelList, newChatId) {
    const userChats = await firebaseService.getUserChats(firebase.auth().currentUser.uid)
    console.log("new chat id -> " + newChatId)
    userChats.push(newChatId)
    console.log("to push -> " + userChats)
    firebaseService.setNewChatsToUser(firebase.auth().currentUser.uid, userChats)
    await firebaseService.connectUserToChat(newChatId, firebase.auth().currentUser.uid)

    console.log("!!!chat has been added!!!")
    // addChatToMenu(channelList, newChatId)
}

export async function searchChats(searchText, chatMsgList) {
    const chats = await firebaseService.getAllChats()
    const userChats = await firebaseService.getUserChats(firebase.auth().currentUser.uid)

    for (const chat of chats) {
        const chatObj = chat[chat.id]
        const lowerName = chatObj.name.toLowerCase()
        if (chatObj.type == "channel" && lowerName.includes(searchText.toLowerCase())) {
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