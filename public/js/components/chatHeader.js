export let userHeader = (username) => {
                    let header = `
                                <div class="user">
                                    <div class="photo">
                                        <img src="img/avatar.png" alt="user photo">
                                    </div>
                                    <div class="name">
                                        <span>${username}</span>
                                    </div>
                                </div>`
    return header
}