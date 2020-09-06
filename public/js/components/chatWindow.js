export let firstMessage = (username, time, msg) => {
                    let firstMsg = `
                                    <li class="first">
                                        <div class="photo">
                                            <img src="img/man.jpg" alt="user photo">
                                        </div>
                                        <div>
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
                                    <div class="separate">
                                        <div class="text">${date}</div>
                                    </div>`
    return separator
}
                    