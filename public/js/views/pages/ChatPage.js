import UserHeader from "../../components/chatHeader.js"
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
                                ${await UserHeader.render(firebase.auth().currentUser.displayName)}
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
                                        <span class="user-is-typing"></span>
                                        <div>                    
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

        const directMsgList = document.getElementById("direct-msgs-list")
        const chatMsgList = document.getElementById("chat-messages")
        const channelsList = document.getElementById("channels-list")
        const typeMsgInput = document.getElementById("type-message")
        const sendMsgButton = document.getElementById("send-message")
        const searchChatsInput = document.getElementById("chat-search-input")
        const searchChatButton = document.getElementById("chat-search-button")
        const addDirectButton = document.getElementById("add-direct-button")
        const addChannelButton = document.getElementById("add-channel-button")
        const stickersButton = document.getElementById("stickers-button")
        const userIsTyping = document.querySelector(".user-is-typing")

        await UserHeader.after_render()

        // let userChats = await firebaseService.getUserChats(firebase.auth().currentUser.uid)
        // await menuHandlers.uploadInitDirect(directMsgList, userChats)

        // добавление обработчиков на кнопки выбора канала
        channelsList.addEventListener("click", async (event) => {
            await switchChatRoom(event, chatMsgList)
        })

        // добавление обработчиков на кнопки выбора чата
        directMsgList.addEventListener("click", async (event) => {
            await switchChatRoom(event, chatMsgList)
        })

        // обработчик нажатия на кнопку стикеров
        stickersButton.addEventListener("click", async () => {
            await presentModal(StickersModal)
        })

        // обработчик нажатия на добавить channel
        addChannelButton.addEventListener("click", async () => {
            await presentModal(AddChannelModal)
        })

        // обработчик нажатия на добавить direct
        addDirectButton.addEventListener("click", async () => {
            await presentModal(AddDirectModal)
        })

        // обработчик на кнопки добавления чата из списка
        chatMsgList.addEventListener("click", async (event) => {
            const element = document.getElementById(event.target.id)
            if (event.target.nodeName === "BUTTON" && element.classList.contains("add-new-chat-button")) {
                const id = element.id.split("@")[1]
                const chat = await firebaseService.getChatById(id)

                if (chat.private) {
                    const entryBlock = element.parentNode.parentNode
                    console.log(entryBlock)
                    const inputPass = entryBlock.querySelector(".search-channel-password-input")
                    
                    console.log("id -> " + id)

                    if (inputPass.value == chat.password) {
                        await searchChatsHandlers.addChat(channelsList, id)
                        element.style.visibility = "hidden"
                        alert("added success")
                    } else {
                        alert("Password do not match!")
                    }
                } else {
                    await searchChatsHandlers.addChat(channelsList, id)
                    element.style.visibility = "hidden"
                    alert("added success")
                }
            }
        })

        // обработчик на button - поиск чатов
        searchChatButton.addEventListener("click", async () => {
            chatMsgList.innerHTML = ""
            if (!chatMsgList.classList.contains("list-show-border")) {
                chatMsgList.classList.add("list-show-border")
            }
            console.log("emited search event")
            await searchChatsHandlers.searchChats(searchChatsInput.value, chatMsgList)
        })

        // подписка на добавление нового чата у юзера
        firebase.database().ref("/users/" + firebase.auth().currentUser.uid + "/chatsConnected").on("child_added", async (snapshot) => {
            console.log(snapshot.val())
            const chat = await firebaseService.getChatById(snapshot.val())
            if (chat != null) {
               if (chat.type == "direct") {
                    console.log("adding new direct")
                    const connectedUsersId = chat.connectedUsers
                    Utils.removeElemFromArray(connectedUsersId, firebase.auth().currentUser.uid)
                    const user = await firebaseService.getUserById(connectedUsersId[0])
                    directMsgList.innerHTML += chatMenu.directMessages(snapshot.val(), user.username, 0)
                } else if (chat.type == "channel") {
                    console.log("adding new channel")
                    if (chat.private) {
                        channelsList.innerHTML += chatMenu.channelPrivate(snapshot.val(), chat.name, 0)
                    } else {
                        channelsList.innerHTML += chatMenu.channel(snapshot.val(), chat.name, 0)
                    }
                }

                // подписка на новый добавленный чат (так же срабатывает при запуске страницы, когда подгружается бд)
                firebase.database().ref("/chat/" + snapshot.val() + "/messages").on("child_added", async (snapshot) => {
                    await chatHandlers.innerMessage(snapshot.val(), currentUserState, chatMsgList)
                })

                firebase.database().ref("/chat/" + snapshot.val() + "/userTyping").on("value", (snapshotUser) => {
                    // console.log(">>>>>>> User (" + snapshotUser.val() + ") is typing in chat (" + snapshot.val() + ") <<<<<<<<<")
                    // console.log()
                    if (snapshotUser.val() != firebase.auth().currentUser.displayName) {
                        let text;

                        if (snapshotUser.exists() && snapshotUser.val() != "") {
                            text = snapshotUser.val() + " is typing..."
                        } else {
                            text = ""
                        }

                        userIsTyping.textContent = text
                    }
                })
            }
        })

        // async function aaa() {
        //     await firebase.database().ref("/chat/" + currentUserState.id + "/userTyping").set(firebase.auth().currentUser.displayName)

        //     Utils.sleep(2000)

        //     await firebase.database().ref("/chat/" + currentUserState.id + "/userTyping").set("")
        // }

        typeMsgInput.addEventListener("keypress", async () => {
            await firebase.database().ref("/chat/" + currentUserState.id + "/userTyping").set(firebase.auth().currentUser.displayName)

            const text = typeMsgInput.value
            let time = setTimeout(async () => {
                if (text == typeMsgInput.value) {
                    await firebase.database().ref("/chat/" + currentUserState.id + "/userTyping").set("")
                } else {
                    clearTimeout(time)
                }
            }, 2000)
        })

        // сделать id в порядке возрастания, иначе сообщения будут в рандомном порядке
        // тоже самое для чатов

        // отослать сообщение, добавление в бд сообщения
        sendMsgButton.addEventListener("click", async (event) => {
            event.preventDefault()
            console.log(firebase.auth().currentUser.displayName)
            if (typeMsgInput.value != "") {
                // const avatarUrl = await firebaseService.getUserAvatarUrl(firebase.auth().currentUser.uid)
                const datetime = new Date()
                const currentDatetime = Utils.buildDateTime(datetime)
                // console.log(currentDatetime)
                // console.log(avatarUrl)
                const message = new Message(
                    currentUserState.id,
                    "text",
                    firebase.auth().currentUser.uid,
                    true, 
                    typeMsgInput.value,
                    currentDatetime
                )
                firebaseService.createMessage(message)
            }
        })
    }
}

async function switchChatRoom(event, chatMsgList) {
    currentUserState.id = event.target.id
    const element = document.getElementById(currentUserState.id)
    if (event.target.nodeName === "BUTTON" && element.classList.contains("name")) {
        if (chatMsgList.classList.contains("list-show-border")) {
            chatMsgList.classList.remove("list-show-border")
        }
        currentUserState.lastMsgDate = ""
        await chatHandlers.setCurrentChat(currentUserState.id, currentUserState)
    }
}

export default ChatPage;