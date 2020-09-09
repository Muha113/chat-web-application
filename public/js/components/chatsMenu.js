export let channelPrivate = (buttonId, chanName, unreadMsg) => {
    let chan = `
                <li class="channel private">
                    <button id="${buttonId}" class="name">
                        <!-- <div class="icon"></div> -->
                        <img class="private-icon" src="img/zamochek-icon.png" alt="">
                        ${chanName}
                    </button>
                    <div class="count-unread-messages">${unreadMsg == 0 ? "" : "+" + unreadMsg}</div>
                </li>`
    return chan
}

export let channel = (buttonId, chanName, unreadMsg) => {
    let chan = `
                <li class="channel">
                    <button id="${buttonId}" class="name">${chanName}</button>
                    <div class="count-unread-messages">${unreadMsg == 0 ? "" : "+" + unreadMsg}</div>
                </li>`
    return chan
}

export let directMessages = (buttonId, chatName, unreadMsg) => {
    let chat = `
                <li class="user">
                    <button id="${buttonId}" class="name">
                        ${chatName}
                    </button>
                    <div class="count-unread-messages">${unreadMsg == 0 ? "" : "+" + unreadMsg}</div>
                </li>`
    return chat
}