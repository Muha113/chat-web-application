import Message from "../models/message.js"
import * as chatHandlers from "../handlers/chatHandlers.js"

class FirebaseService {

    async createUser({uid}, email, username, avatarUrl) {
        await firebase.database().ref("/users/" + uid).set(
            {
                email: email,
                username: username,
                avatarUrl: avatarUrl,
                currentChatId: "$",
                isTyping: false
            }
        );
    }

    async getUserById(userId) {
        const snapshot = await firebase.database().ref("/users/" + userId).once("value")
        if (snapshot.exists()) {
            return snapshot.val()
        }
        return null
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

    async getConnectedUsersToChat(chatId) {
        const snapshot = await firebase.database().ref("/chat/" + chatId + "/connectedUsers").once("value")
        if (snapshot.exists()) {
            return snapshot.val()
        }
        return null
    }

    async getUserIdByUsername(username) {
        const users = await this.getAllUsers()
        if (users != null) {
            for (const user of users) {
                if (user[user.id].username == username) {
                    return user.id
                }
            }
        }
        return null
    }

    async getUserChatsConnectedId(userId) {
        const userChats = await this.getUserChats(userId)
        const connectedUsersToChats = []
        if (userChats != null) {
            console.log(userChats)
            for (const userChat of userChats) {
                const users = await this.getConnectedUsersToChat(userChat)
                console.log(users)
                if (users != null) {
                    connectedUsersToChats.push(users)
                }
            }
        }
        console.log(connectedUsersToChats)
        return connectedUsersToChats
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

    async getUserAvatarUrl(userId) {
        // console.log("User id -> " + userId)
        const snapshot = await firebase.database().ref("/users/" + userId + "/avatarUrl").once("value")
        // console.log(snapshot.val())
        return snapshot.val()
    }

    async getUsername(userId) {
        const snapshot = await firebase.database().ref("/users/" + userId + "/username").once("value")
        return snapshot.val()
    }

    async changeUserAvatar(userId, file, metadata) {
        const user = await this.getUserById(userId)
        
        if (user != null) {
            const newUrl = await firebase.storage().ref("/avatars").child(userId).put(file, metadata)
                .then((snapshot) => {
                    return snapshot.ref.getDownloadURL().then(url => {
                        console.log(url)
                        return url
                    })
                })
                .catch(error => {
                    alert(error)
                    return null
                })
            console.log(newUrl)
            if (newUrl != null) {
                user.avatarUrl = newUrl
                firebase.database().ref("/users/" + userId).set(user)
            }
        }
    }

    async changeUserUsername(userId, newUsername) {
        const user = await this.getUserById(userId)
        
        if (user != null) {
            user.username = newUsername
            firebase.database().ref("/users/" + userId).update(user)
        }
    }

    async createMessage(message) {
        let msgKey
        msgKey = await firebase.database().ref("/chat/" + message.chatId + "/messages").push({
            chatId: message.chatId,
            type: message.type,
            userId: message.userId,
            isRead: message.isRead,
            text: message.text,
            time: message.time
        })
        .then(res => {
            return res.getKey()
        })
        .catch(error => {
            return null
        });

        return msgKey
    }

    async addChatToUser(userId, newChatId) {
        const userChats = await this.getUserChats(userId)
        if (userChats != null) {
            userChats.push(newChatId)
            firebase.database().ref("/users/" + userId + "/chatsConnected").update(userChats)
        } else {
            const newChatsArray = [newChatId]
            firebase.database().ref("/users/" + userId + "/chatsConnected").update(newChatsArray)
        }
    }

    setNewChatsToUser(userId, chatsIds) {
        firebase.database().ref("/users/" + userId + "/chatsConnected").set(chatsIds)
    }

    async connectUserToChat(chatId, userId) {
        const snapshot = await firebase.database().ref("/chat/" + chatId + "/connectedUsers").once("value")

        if (snapshot.exists()) {
            const newIds = snapshot.val()
            newIds.push(userId)
            
            firebase.database().ref("/chat/" + chatId + "/connectedUsers").update(newIds)
        }
    }

    async createChat(chatType, connectedUsers, chatName, isPrivate, passwd) {
        const newChat = {
            type: chatType,
            connectedUsers: connectedUsers,
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