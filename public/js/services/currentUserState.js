class CurrentUserState {
    static _instance;
    chatType;
    id;

    constructor(chatType, id) {
        this.chatType = chatType
        this.id = id
    }

    static init() {
        if (CurrentUserState._instance != null) {
            return CurrentUserState._instance
        }

        CurrentUserState._instance = new CurrentUserState("", "")
        return CurrentUserState._instance
    }
}

export const currentUserState = CurrentUserState.init()