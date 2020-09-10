import Message from "../models/message.js"
import * as chatHandlers from "../handlers/chatHandlers.js"

class FirebaseService {

    // async readUserData({uid}) {
    //     const snapshot = await firebase.database().ref("users/").child(uid).once("value");
    //     const data = snapshot.val();
    //     return data;
    // }

    usersRef() {
        return firebase.database().ref("/users");
    }

    async writeUserData({uid}, email, username) {
        await this.usersRef().child(uid).set(
            {
                email: email,
                username: username,
                // name: name,
                // surname: surname,
            }
        );
    }

    async getUserChats(userId) {
        const snapshot = await firebase.database().ref("/users/" + userId + "/chatsConnected").once("value")
        if (snapshot.exists()) {
            return snapshot.val()
        }
        return null
    }

    async getChatById(id) {
        const snapshot = await firebase.database().ref("/chat/" + id).once("value")
        if (snapshot.exists()) {
            return snapshot.val()
        }
        return null
    }

    async getChatMessages(id) {
        const snapshot = await firebase.database().ref("/chat/" + id + "/messages").once("value")
        if (snapshot.exists()) {
            return [...Object.keys(snapshot.val()).map(key => ({
                id: key,
                ...snapshot.val()
            }))]
        }
        return null
    }

    async getAllChats() {
        const snapshot = await firebase.database().ref("/chat").once("value")
        if (snapshot.exists()) {
            return [...Object.keys(snapshot.val()).map(key => ({
                id: key,
                ...snapshot.val()
            }))]
        }
        return null
    }

    async getAllUsers() {
        const snapshot = await firebase.database().ref("/users").once("value")
        if (snapshot.exists()) {
            console.log(snapshot.val())
            return [...Object.keys(snapshot.val()).map(key => ({
                id: key,
                ...snapshot.val()
            }))]
        }
        return null
    }

    async getUserChatsNames(userId) {
        const userChats = await this.getUserChats(userId)
        const userChatNames = []
        if (userChats != null) {
            console.log(userChats)
            for (const userChat of userChats) {
                const chat = await this.getChatById(userChat)
                console.log(chat)
                userChatNames.push(chat.name)
            }
        }
        console.log(userChatNames)
        return userChatNames
    }

    async getAllChannelsNames() {
        const chats = await this.getAllChats()

        const allChatsNames = []
        for (const chat of chats) {
            const chatObj = chat[chat.id]
            if (chatObj.type == "channel") {
                allChatsNames.push(chatObj.name)
            }
        }
        return allChatsNames
    }

    createMessage(message) {
        console.log(message)
        firebase.database().ref("/chat/" + message.chatId + "/messages").push({
            chatId: message.chatId,
            type: message.type,
            username: message.username,
            isRead: message.isRead,
            text: message.text,
            time: message.time
        })
        .then(res => {
            console.log(res.getKey())
            // return res.getKey()
        })
        .catch(error => {
            console.log(error)
            // return null
        });
    }

    async addChatToUser(userId, newChatId) {
        const userChats = await this.getUserChats(userId)
        if (userChats != null) {
            userChats.push(newChatId)
            console.log(userChats)
            firebase.database().ref("/users/" + userId + "/chatsConnected").update(userChats)
        } else {
            const newChatsArray = [newChatId]
            firebase.database().ref("/users/" + userId + "/chatsConnected").update(newChatsArray)
        }
    }

    setNewChatsToUser(userId, chatsIds) {
        firebase.database().ref("/users/" + userId + "/chatsConnected").set(chatsIds)
    }

    async createChat(chatType, chatName, isPrivate, passwd) {
        const newChat = {
            type: chatType,
            name: chatName,
            private: isPrivate,
            password: passwd,
            members: 2
        }

        let result
        result = await firebase.database().ref("chat/").push(newChat)
            .then(res => {
                return res.getKey()
            })
            .catch(err => {
                alert(err)
                return null
            })

        return result
    }
}

export default FirebaseService