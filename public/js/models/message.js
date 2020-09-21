export class Message {
    chatId;
    type;
    userId;
    userAvatarUrl
    isRead;
    text;
    time;

    constructor(chatId, msgType, userId, isRead, text, time) {
        this.chatId = chatId
        this.type = msgType
        this.userId = userId
        this.text = text
        this.isRead = isRead
        this.time = time
    }
}

export default Message