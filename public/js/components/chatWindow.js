export let firstMessage = (username, avatarUrl, time, msg, msgId, isRead) => {
    let firstMsg = `
                    <li class="first">
                        <div class="photo">
                            <img src="${avatarUrl}" alt="user photo">
                        </div>
                        <div class="expand-width">
                            <div class="user-info">
                                <div class="name">${username}</div>
                                <div class="time">${time}</div>
                            </div>

                            <div id="message@${msgId}" class="message" style="background: ${isRead ? "white" : "grey"};">
                                ${msg}
                            </div>
                        </div>
                    </li>`
    return firstMsg
}

export let simpleMessage = (msg) => {
    let simpleMsg = `
                    <li>
                        <div class="message">
                            ${msg}
                        </div>
                    </li>`
    return simpleMsg
}

export let dateSeparator = (date) => {
    let separator = `
                    <li class="date-separator">
                        <div class="separate">
                            <div class="text">${date}</div>
                        </div>
                    </li>`
    return separator
}

export let stickerMessage = (username, avatarUrl, time, imgUrl, msgId, isRead) => {
    let sticker = `
                <li class="first">
                    <div class="photo">
                        <img src="${avatarUrl}" alt="user photo">
                    </div>
                    <div class="expand-width">
                        <div class="user-info">
                            <div class="name">${username}</div>
                            <div class="time">${time}</div>
                        </div>

                        <div id="message@${msgId}" class="message" style="background: ${isRead ? "white" : "grey"};">
                            <img class="sticker-message" src="${imgUrl}" alt="sticker">
                        </div>
                    </div>
                </li>`
    return sticker
}
                    