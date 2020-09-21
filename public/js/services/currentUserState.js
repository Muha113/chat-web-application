class CurrentUserState {
    chatType;
    id;
    lastMsgDate;

    constructor(chatType, id) {
        this.chatType = chatType
        this.id = id
        this.lastMsgDate = ""
    }
}

export const currentUserState = new CurrentUserState("", "")