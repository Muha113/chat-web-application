export let channel = (chanName, unreadMsg) => {
                let chan = `
                            <li class="channel private">
                                <div class="name">
                                    <!-- <div class="icon"></div> -->
                                    <img class="private-icon" src="img/zamochek-icon.png" alt="">
                                    ${chanName}
                                </div>
                                <div class="count-unread-messages">${unreadMsg == 0 ? "" : "+" + unreadMsg}</div>
                            </li>`
    return chan
}

export let channelPrivate = (chanName, unreadMsg) => {
                        let chan = `
                                    <li class="channel">
                                        <div class="name">${chanName}</div>
                                        <div class="count-unread-messages">${unreadMsg == 0 ? "" : "+" + unreadMsg}</div>
                                    </li>`
    return chan
}

export let directMessages = (chatName, unreadMsg) => {
                let chat = `
                            <li class="user">
                                <div class="name">
                                    ${chatName}
                                </div>
                                <div class="count-unread-messages">${unreadMsg == 0 ? "" : "+" + unreadMsg}</div>
                            </li>`
    return chat
}