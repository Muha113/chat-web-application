export class Message {
    chatId;
    type;
    username;
    isRead;
    text;
    time;

    constructor(chatId, msgType, username, isRead, text, time) {
        this.chatId = chatId
        this.type = msgType
        this.username = username
        this.text = text
        this.isRead = isRead
        this.time = time
    }
}

export default Message