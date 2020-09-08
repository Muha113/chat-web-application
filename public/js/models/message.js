export class Message {
    chatId;
    username;
    isRead;
    text;
    time;

    constructor(chatId, username, isRead, text, time) {
        this.chatId = chatId
        this.username = username
        this.text = text
        this.isRead = isRead
        this.time = time
    }
}

export default Message