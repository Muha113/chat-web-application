import {userHeader} from "../../components/chatHeader.js"
import * as chatMenu from "../../components/chatsMenu.js"
import * as chatWindow from "../../components/chatWindow.js"
import {Message} from "../../models/message.js"

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

        let currentUserState = {
            chatType: "",
            id: ""
        }

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

        let directMsgList = document.getElementById("direct-msgs-list")
        uploadDirect(directMsgList, userChats)

        // блок окна переписки
        let chatRoom = document.getElementById("chat-block")
        chatRoom.innerHTML += `<ul id="chat-messages"></ul>`

        // список в который толкать сообщеньки
        let chatMsgList = document.getElementById("chat-messages")

        let ttt = ["-MGbpneEnnuD11WkVngn", "-MGbuPezLdWBFhIfBga6", "-MGbuPf19GBPpuMIDbUM"]
        for (let i = 0; i < 3; i++) {
            firebase.database().ref("/chat/" + ttt[i] + "/messages").on("child_added", (snapshot) => {
                console.log("recieved message")
                chatMsgList.innerHTML += chatWindow.firstMessage(
                    snapshot.val().username,
                    snapshot.val().time,
                    snapshot.val().text
                )
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

        sendMsgButton.addEventListener('click', (event) => {
            event.preventDefault()
            console.log(firebase.auth().currentUser.displayName)
            if (typeMsgInput.value != "") {
                let ll
                if (firebase.auth().currentUser.displayName == "popa") {
                    ll = "-MGbpneEnnuD11WkVngn"
                } else if (firebase.auth().currentUser.displayName == "dadaya") {
                    ll = "-MGbuPezLdWBFhIfBga6"
                }

                firebase.database().ref("/chat/" + ll + "/messages").push({
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

async function uploadDirect(directList, directChats) {
    for (const elem of directChats) {
        const chatData = await firebase.database().ref("/chat/" + elem).once("value")
        if (chatData.exists()) {
            console.log(chatData.val())
            directList.innerHTML += chatMenu.directMessages(elem, chatData.val().chatName, 5)
        }
    }
}

export default ChatPage;