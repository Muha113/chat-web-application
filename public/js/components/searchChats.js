let searchChat = (chatId, chatName, totalMembers, isAlreadyExist) => {
    let search = `
                <li class="search-list-li-nomargin">
                    <div class="search-list-item">
                        <h1 class="search-list-item-header">
                            <button id="chat_${chatId}" class="add-new-chat-button" style="display: ${isAlreadyExist ? "none" : "block"};">
                                <img class="search-list-item-icon" src="img/plus-icon.png" alt="">
                            </button>
                            ${chatName}
                        </h1>
                        <p class="search-list-item-members">Members : ${totalMembers}</p>
                    </div>
                </li>`

    return search
}

let searchChatPrivate = (chatId, chatName, totalMembers, isAlreadyExist) => {
    let search = `
                <li class="search-list-li-nomargin">
                    <div class="search-list-item">
                        <h1 class="search-list-item-header">
                            <button id="chat_${chatId}" class="add-new-chat-button" style="display: ${isAlreadyExist ? "none" : "block"};">
                            
                            </button>
                            ${chatName}
                        </h1>
                        <img class="search-list-item-icon private" src="img/private.jpg" alt="">
                        <p class="search-list-item-members">Members : ${totalMembers}</p>
                    </div>
                </li>`
    return search
}
{/* <img class="search-list-item-icon" src="img/plus-icon.png" alt=""> */}

export let searchChatsListItem = (chatId, chatName, isPrivate, totalMembers, isAlreadyExist) => {
    if (isPrivate) {
        return searchChatPrivate(chatId, chatName, totalMembers, isAlreadyExist)
    }
    return searchChat(chatId, chatName, totalMembers, isAlreadyExist)
}