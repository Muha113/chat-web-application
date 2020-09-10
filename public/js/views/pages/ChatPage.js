import {userHeader} from "../../components/chatHeader.js"
import * as chatMenu from "../../components/chatsMenu.js"
import * as chatWindow from "../../components/chatWindow.js"
import {Message} from "../../models/message.js"
import {firebaseService} from "../../services/index.js"
import Utils from "../../services/Utils.js"
import * as chatHandlers from "../../handlers/chatHandlers.js"
import * as searchChatsHandlers from "../../handlers/searchChatsHandlers.js"
import * as menuHandlers from "../../handlers/menuHandlers.js"
import {presentModal} from "../../services/modalService.js"
import AddDirectModal from "./AddDirectModal.js"
import AddChannelModal from "./AddChannelModal.js"
import StickersModal from "./StickersModal.js"
import {currentUserState} from "../../services/currentUserState.js"


let ChatPage = {
    render: async () => {
        let view = `
                    <div class="page">

                        <div class="top-nav">
                            <div class="logo">
                                <img src="img/logo.png" alt="logo">
                            </div>

                            <div class="search">
                                <input id="chat-search-input" type="text" placeholder="Global search">
                                <button id="chat-search-button" class="search-button">Search</button>
                                
                            </div>
                            <div id="user-header" class="user">

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
                                        <button id="add-channel-button" class="add-icon"></button>
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
                                        <button id="add-direct-button" class="add-icon"></button>
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
                                                <button id="send-message" class="send-message-button">Send</button>
                                            </div>
                    
                                            <button id="stickers-button" class="smile"></button>
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

        // console.log(currentUserState)

        let user = firebase.auth().currentUser

        let userHeaderInfo = document.getElementById("user-header")
        let directMsgList = document.getElementById("direct-msgs-list")
        let chatMsgList = document.getElementById("chat-messages")
        let channelsList = document.getElementById("channels-list")
        let typeMsgInput = document.getElementById("type-message")
        let sendMsgButton = document.getElementById("send-message")
        let searchChatsInput = document.getElementById("chat-search-input")
        let searchChatButton = document.getElementById("chat-search-button")
        let addDirectButton = document.getElementById("add-direct-button")
        let addChannelButton = document.getElementById("add-channel-button")
        let stickersButton = document.getElementById("stickers-button")

        userHeaderInfo.innerHTML += userHeader(user.displayName)

        // let userChats = await firebaseService.getUserChats(firebase.auth().currentUser.uid)
        // await menuHandlers.uploadInitDirect(directMsgList, userChats)

        // добавление обработчиков на кнопки выбора канала
        channelsList.addEventListener("click", async (event) => {
            currentUserState.id = event.target.id
            let element = document.getElementById(currentUserState.id)
            if (event.target.nodeName === "BUTTON" && element.classList.contains("name")) {
                if (chatMsgList.classList.contains("list-show-border")) {
                    chatMsgList.classList.remove("list-show-border")
                }
                await chatHandlers.setCurrentChat(currentUserState.id)
            }
        })

        // добавление обработчиков на кнопки выбора чата
        directMsgList.addEventListener("click", async (event) => {
            currentUserState.id = event.target.id
            let element = document.getElementById(currentUserState.id)
            if (event.target.nodeName === "BUTTON" && element.classList.contains("name")) {
                if (chatMsgList.classList.contains("list-show-border")) {
                    chatMsgList.classList.remove("list-show-border")
                }
                await chatHandlers.setCurrentChat(currentUserState.id)
            }
        })

        // обработчик нажатия на кнопку стикеров
        stickersButton.addEventListener("click", (event) => {
            event.preventDefault()
            presentModal(StickersModal)
        })

        // обработчик нажатия на добавить channel
        addChannelButton.addEventListener("click", () => {
            presentModal(AddChannelModal)
        })

        // обработчик нажатия на добавить direct
        addDirectButton.addEventListener("click", () => {
            presentModal(AddDirectModal)
        })

        // обработчик на кнопки добавления чата из списка
        chatMsgList.addEventListener("click", async (event) => {
            let element = document.getElementById(event.target.id)
            if (event.target.nodeName === "BUTTON" && element.classList.contains("add-new-chat-button")) {
                console.log("!!!chat has been added!!!")
                // временное решение
                let userChats = await firebaseService.getUserChats(firebase.auth().currentUser.uid)
                const id = event.target.id.split("_")[1]
                userChats.push(id)
                firebaseService.setNewChatsToUser(userChats)
                menuHandlers.addChatToMenu(directMsgList, id)
            }
        })

        // обработчик на button - поиск чатов
        searchChatButton.addEventListener("click", async (event) => {
            event.preventDefault()
            chatMsgList.innerHTML = ""
            if (!chatMsgList.classList.contains("list-show-border")) {
                chatMsgList.classList.add("list-show-border")
            }
            await searchChatsHandlers.searchChats(searchChatsInput.value, chatMsgList)
        })

        // подписка на добавление сообщения в чат
        // добавить в firebaseService
        const userChats = await firebaseService.getUserChats(firebase.auth().currentUser.uid)
        if (userChats != null) {
            // console.log(userChats)
            for (const chatId of userChats) {
                firebase.database().ref("/chat/" + chatId + "/messages").on("child_added", (snapshot) => {
                    chatHandlers.innerMessage(snapshot.val(), currentUserState.id, chatMsgList)
                })
            }
        }

        // подписка на добавление нового чата у юзера
        firebase.database().ref("/users/" + firebase.auth().currentUser.uid + "/chatsConnected").on("child_added", async (snapshot) => {
            console.log(snapshot.val())
            const chat = await firebaseService.getChatById(snapshot.val())
            if (chat != null) {
               if (chat.type == "direct") {
                    console.log("adding new direct")
                    const usernameFull = chat.name
                    const usernameSplited = usernameFull.split("$")
                    Utils.removeElemFromArray(usernameSplited, firebase.auth().currentUser.displayName)
                    directMsgList.innerHTML += chatMenu.directMessages(snapshot.val(), usernameSplited[0], 0)
                } else if (chat.type == "channel") {
                    if (chat.private) {
                        channelsList.innerHTML += chatMenu.channelPrivate(snapshot.val(), chat.name, 0)
                    } else {
                        channelsList.innerHTML += chatMenu.channel(snapshot.val(), chat.name, 0)
                    }
                }
                // подписка на новый добавленный чат
                firebase.database().ref("/chat/" + snapshot.val() + "/messages").on("child_added", (snapshot) => {
                    chatHandlers.innerMessage(snapshot.val(), currentUserState.id, chatMsgList)
                })
            }
        })

        // сделать id в порядке возрастания, иначе сообщения будут в рандомном порядке
        // тоже самое для чатов

        // отослать сообщение, добавление в бд сообщения
        sendMsgButton.addEventListener("click", (event) => {
            event.preventDefault()
            console.log(firebase.auth().currentUser.displayName)
            if (typeMsgInput.value != "") {
                const message = new Message(
                    currentUserState.id,
                    "text",
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

export default ChatPage;