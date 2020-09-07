export class Message {
    constructor({id, username, isRead, text, time}) {
        this.id = id
        this.username = username
        this.text = text
        this.isRead = isRead
        this.time = time
    }
}