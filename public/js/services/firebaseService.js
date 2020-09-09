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

    async getUserChats() {
        const snapshot = await firebase.database().ref("/users/" + firebase.auth().currentUser.uid + "/chatsConnected").once("value")
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
        })
        .catch(error => console.log(error));
    }

    addChatToUser(chatId) {
    }

    setNewChatsToUser(chatsIds) {
        firebase.database().ref("/users/" + firebase.auth().currentUser.uid + "/chatsConnected").set(chatsIds)
    }

    createChat(chatType, chatName, isPrivate, passwd) {
        let newChat = {
            type: chatType,
            name: chatName,
            private: isPrivate,
            password: passwd,
            members: 1
        }
        firebase.database().ref("chat/").push(newChat)
    }
}

export default FirebaseService