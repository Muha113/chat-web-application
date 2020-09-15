export function changeElemDisplay(elem, newDisplay) {
    elem.style.display = newDisplay
}

export function currentElemDisplay(elem) {
    return elem.style.display
}

export function changeBackgroundColorElem(elem, newColor) {
    elem.style.backgroundColor = newColor
}

export function incrementMessagesUnread(elem) {
    const currentUnreadText = elem.textContent
    let currentUnread = 1
    if (currentUnreadText != "") {
        const currentUnreadNumber = currentUnreadText.split("+")[1]
        const currentUnreadInt = +currentUnreadNumber
        currentUnread = currentUnreadInt + 1
    }
    elem.textContent = "+" + currentUnread;
}

export function setNewValueMessagesUnread(elem, newValue) {
    elem.textContent = newValue == 0 ? "" : "+" + newValue
}