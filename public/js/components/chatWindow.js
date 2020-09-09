export let firstMessage = (username, time, msg) => {
    let firstMsg = `
                    <li class="first">
                        <div class="photo">
                            <img src="img/man.jpg" alt="user photo">
                        </div>
                        <div class="expand-width">
                            <div class="user-info">
                                <div class="name">${username}</div>
                                <div class="time">${time}</div>
                            </div>

                            <div class="message">
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

export let stickerMessage = (username, time, imgUrl) => {
    let sticker = `
                <li class="first">
                    <div class="photo">
                        <img src="img/man.jpg" alt="user photo">
                    </div>
                    <div class="expand-width">
                        <div class="user-info">
                            <div class="name">${username}</div>
                            <div class="time">${time}</div>
                        </div>

                        <div class="message">
                            <img class="sticker-message" src="img/stickers/${imgUrl}" alt="sticker">
                        </div>
                    </div>
                </li>`
    return sticker
}
                    