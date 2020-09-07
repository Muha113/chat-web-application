import {userHeader} from "../../components/chatHeader.js"
import * as chatMenu from "../../components/chatsMenu.js"
import * as chatWindow from "../../components/chatWindow.js"
import {Message} from "../../models/message.js"

let currentUserState = {
    chatType: "",
    id: ""
}


let ChatPage = {
    render: async () => {
        let view = `
                    <div class="page">

                        <div id="chat-header" class="top-nav">
                            <div class="logo">
                                <img src="img/logo.png" alt="logo">
                            </div>

                            <div class="search">
                                <input id="chat-search-input" type="text" placeholder="Global search">
                            </div>
                            
                        </div>
                        
                        <div class="chat">
                            <div class="menu">
                                <div class="menu-item">
                                    <div class="header">
                                        <div class="title">
                                            <div class="arrow-down"></div>
                                            Channels
                                        </div>
                                        <div class="add-icon">
                                            <img src="img/plus-icon.png" alt="">
                                        </div>
                                    </div>

                                    <ul id="channels-list" class="content">

                                    </ul>
                                </div>

                                <div class="menu-item">
                                    <div class="header">
                                        <div class="title">
                                            <div class="arrow-down"></div>
                                            Direct messages
                                        </div>
                                        <div class="add-icon">
                                            <img src="img/plus-icon.png" alt="">
                                        </div>
                                    </div>

                                    <ul id="direct-msgs-list" class="content">

                                    </ul>

                                </div>
                            </div>

                            <div class="chat-content">
                                <div class="messages">
                                    <div id="chat-block" class="message-container">
                                    </div>
                                </div>

                                <div class="create-mesage">
                                    <div class="content">
                                        <div>
                                            <div class="share">
                                                <img src="img/addAtt.jpg" alt="add attachment">
                                            </div>
                    
                                            <div class="message">
                                                <input id="type-message" type="text" placeholder="Just start typing message">
                                                <button id="send-message">Send</button>
                                            </div>
                    
                                            <div class="smile">
                                                <img src="img/smile.jpg" alt="smile">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`

        return view
    },
    after_render: async () => {
        document.getElementById('index-css-link').href = '../../../css/chat.css'

        let user = firebase.auth().currentUser

        let header = document.getElementById("chat-header")
        header.innerHTML += userHeader(user.displayName)

        let userChats = await getUserChats()
        
        /* сделать тоже самое что и с directMsgList
        let channelsList = document.getElementById("channels-list")
        channelsList.innerHTML += chatMenu.channel("Six Group", 14)
        channelsList.innerHTML += chatMenu.channel("Test Channel", 150)
        channelsList.innerHTML += chatMenu.channelPrivate("Private channel", 8)
        */

        // динамическая подгрузка чатов в меню слева
        let directMsgList = document.getElementById("direct-msgs-list")
        await uploadDirect(directMsgList, userChats)

        // добавление обработчиков на кнопки выбора чата
        let directMenu = document.getElementById("direct-msgs-list")
        directMenu.addEventListener("click", async (event) => {
            let element = document.getElementById(event.target.id)
            if (event.target.nodeName === "BUTTON" && element.classList.contains("name")) {
                event.preventDefault()
                console.log("button handler detected, btn id : " + event.target.id)
                currentUserState.id = event.target.id
                let chatMsgList = document.getElementById("chat-messages")
                chatMsgList.innerHTML = ""
                let messages = await getChatMessages(currentUserState.id)
                console.log("messages: {")
                console.log(messages)
                console.log("}")
                for (const msg of messages) {
                    chatMsgList.innerHTML += chatWindow.firstMessage(
                        msg[msg.id].username,
                        msg[msg.id].time,
                        msg[msg.id].text
                    )
                }
            }
        })
        // event.target.classList.content('chat-button')

        // блок окна переписки
        let chatRoom = document.getElementById("chat-block")
        chatRoom.innerHTML += `<ul id="chat-messages"></ul>`

        // список в который толкать сообщеньки
        let chatMsgList = document.getElementById("chat-messages")

        // тестовая подписка на все досупные щас чаты
        let ttt = ["-MGbpneEnnuD11WkVngn", "-MGbuPezLdWBFhIfBga6", "-MGbuPf19GBPpuMIDbUM"]
        for (let i = 0; i < 3; i++) {
            firebase.database().ref("/chat/" + ttt[i] + "/messages").on("child_added", (snapshot) => {
                console.log("message recieved -> user chat id: " + currentUserState.id + ", message chat id: " + snapshot.val().chatId)
                if (currentUserState.id == snapshot.val().chatId) {
                    chatMsgList.innerHTML += chatWindow.firstMessage(
                        snapshot.val().username,
                        snapshot.val().time,
                        snapshot.val().text
                    )
                }
            })
        }  

        // сделать id в порядке возрастания, иначе сообщения будут в рандомном порядке
        // тоже самое для чатов

        // firebase.database().ref("/users/d4CPJQXmzJZaQ7fwCt6G32MP2fg1/channelsConnected").set([""])
        // firebase.database().ref("/users/d4CPJQXmzJZaQ7fwCt6G32MP2fg1/chatsConnected").set(["-MGbpneEnnuD11WkVngn", "-MGbuPezLdWBFhIfBga6"])
        // firebase.database().ref("/users/qcCpy2FzABUM3hpBfPB06YQkvIk2/channelsConnected").set([""])
        // firebase.database().ref("/users/qcCpy2FzABUM3hpBfPB06YQkvIk2/chatsConnected").set(["-MGbpneEnnuD11WkVngn", "-MGbuPezLdWBFhIfBga6"])
        
        // отправка сообщенек
        let typeMsgInput = document.getElementById("type-message")
        let sendMsgButton = document.getElementById("send-message")

        // отослать сообщение, добавление в бд сообщения
        sendMsgButton.addEventListener('click', (event) => {
            event.preventDefault()
            console.log(firebase.auth().currentUser.displayName)
            if (typeMsgInput.value != "") {
                firebase.database().ref("/chat/" + currentUserState.id + "/messages").push({
                    chatId: currentUserState.id,
                    username: firebase.auth().currentUser.displayName,
                    isRead: true,
                    text: typeMsgInput.value,
                    time: "11:50"
                })
                .then(res => {
                    console.log(res.getKey())
                })
                .catch(error => console.log(error));
            }
        })
    }
}

async function getUserChats() {
    const snapshot = await firebase.database().ref("/users/" + firebase.auth().currentUser.uid + "/chatsConnected").once("value")
    if (snapshot.exists()) {
        return snapshot.val()
    }
}

async function getChatMessages(id) {
    const snapshot = await firebase.database().ref("/chat/" + id + "/messages").once("value")
    if (snapshot.exists()) {
        // return snapshot.val()
        return [...Object.keys(snapshot.val()).map(key => ({
            id: key,
            ...snapshot.val()
        }))]
    }
}

async function uploadDirect(directList, directChats) {
    for (const elem of directChats) {
        const chatData = await firebase.database().ref("/chat/" + elem).once("value")
        if (chatData.exists()) {
            console.log(chatData.val())
            directList.innerHTML += chatMenu.directMessages(elem, chatData.val().chatName, 0)
        }
    }
}

export default ChatPage;