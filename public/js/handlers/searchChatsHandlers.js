import {searchChatsListItem} from "../components/searchChats.js"
import FirebaseService from "../services/firebaseService.js"

export async function searchChats(searchText) {
    let list = document.getElementById("chat-messages")
    list.classList.add("list-show-border")
    list.innerHTML = ""
    let chats = await FirebaseService.getAllChats()
} 