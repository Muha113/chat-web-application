let searchChat = (chatId, chatName, totalMembers, isAlreadyExist) => {
    let search = `
                <li class="search-list-li-nomargin">
                    <div class="search-list-item">
                        <h1 class="search-list-item-header">
                            <button id="chat@${chatId}" class="add-new-chat-button" style="visibility: ${isAlreadyExist ? "hidden" : "visible"};">
    
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
                            <button id="chat@${chatId}" class="add-new-chat-button" style="visibility: ${isAlreadyExist ? "hidden" : "visible"};">
                            
                            </button>
                            ${chatName}
                        </h1>
                        <img class="search-list-item-icon private" src="img/private.jpg" alt="">
                        <input type="password" name="pass" class="search-channel-password-input" placeholder="password">
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