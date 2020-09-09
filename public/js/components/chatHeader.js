export let userHeader = (username) => {
    let header = `
                <div class="photo">
                    <img src="img/avatar.png" alt="user photo">
                </div>
                <div class="name">
                    <span>${username}</span>
                </div>`
    return header
}