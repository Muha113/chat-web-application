export class Chat {
    id;
    chatType;
    chatName;
    totalMembers;

    constructor({id, chatName, totalMembers}) {
        this.id = id
        this.chatName = chatName
        this.totalMembers = totalMembers
    }
}