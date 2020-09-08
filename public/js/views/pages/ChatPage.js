import {userHeader} from "../../components/chatHeader.js"
import * as chatMenu from "../../components/chatsMenu.js"
import * as chatWindow from "../../components/chatWindow.js"
import {Message} from "../../models/message.js"
import {firebaseService} from "../../services/index.js"
import * as chatHandlers from "../../handlers/chatHandlers.js"

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
                                        <ol id="chat-messages">
                                    
                                        </ol>
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
        let directMsgList = document.getElementById("direct-msgs-list")
        let chatMsgList = document.getElementById("chat-messages")
        let channelsList = document.getElementById("channels-list")
        let typeMsgInput = document.getElementById("type-message")
        let sendMsgButton = document.getElementById("send-message")
        
        header.innerHTML += userHeader(user.displayName)

        // динамическая подгрузка чатов в меню слева
        let userChats = await firebaseService.getUserChats()
        await uploadDirect(directMsgList, userChats)

        // добавление обработчиков на кнопки выбора чата
        directMsgList.addEventListener("click", async (event) => {
            if (chatMsgList.classList.contains("chat-messages")) {
                chatMsgList.classList.remove("chat-messages")
            }
            currentUserState.id = event.target.id
            await chatHandlers.setCurrentChat(currentUserState.id)
        })

        // тестовая подписка на все досупные щас чаты
        // добавить в firebaseService
        let ttt = ["-MGbpneEnnuD11WkVngn", "-MGbuPezLdWBFhIfBga6", "-MGbuPf19GBPpuMIDbUM"]
        for (const chatId of ttt) {
            firebase.database().ref("/chat/" + chatId + "/messages").on("child_added", (snapshot) => {
                chatHandlers.innerMessage(snapshot, currentUserState.id, chatMsgList)
            })
        }

        // сделать id в порядке возрастания, иначе сообщения будут в рандомном порядке
        // тоже самое для чатов

        // отослать сообщение, добавление в бд сообщения
        sendMsgButton.addEventListener('click', (event) => {
            event.preventDefault()
            console.log(firebase.auth().currentUser.displayName)
            if (typeMsgInput.value != "") {
                const message = new Message(
                    currentUserState.id,
                    firebase.auth().currentUser.displayName,
                    true, 
                    typeMsgInput.value,
                    "11:50"
                )
                firebaseService.createMessage(message)
            }
        })
    }
}

async function uploadDirect(directList, directChats) {
    for (const id of directChats) {
        const chatData = await firebaseService.getChatById(id)
        console.log(chatData)
        directList.innerHTML += chatMenu.directMessages(id, chatData.chatName, 0)
    }
}

export default ChatPage;