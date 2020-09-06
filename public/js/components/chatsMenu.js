export let channelPrivate = (chanName, unreadMsg) => {
                let chan = `
                            <li class="channel private">
                                <button class="name">
                                    <!-- <div class="icon"></div> -->
                                    <img class="private-icon" src="img/zamochek-icon.png" alt="">
                                    ${chanName}
                                </button>
                                <div class="count-unread-messages">${unreadMsg == 0 ? "" : "+" + unreadMsg}</div>
                            </li>`
    return chan
}

export let channel = (chanName, unreadMsg) => {
                        let chan = `
                                    <li class="channel">
                                        <button class="name">${chanName}</button>
                                        <div class="count-unread-messages">${unreadMsg == 0 ? "" : "+" + unreadMsg}</div>
                                    </li>`
    return chan
}

export let directMessages = (chatName, unreadMsg) => {
                let chat = `
                            <li class="user">
                                <button class="name">
                                    ${chatName}
                                </button>
                                <div class="count-unread-messages">${unreadMsg == 0 ? "" : "+" + unreadMsg}</div>
                            </li>`
    return chat
}