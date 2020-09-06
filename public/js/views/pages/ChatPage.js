import {userHeader} from "../../components/chatHeader.js"
import * as chatMenu from "../../components/chatsMenu.js"
import * as chatWindow from "../../components/chatWindow.js"

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
        
        let channelsList = document.getElementById("channels-list")
        channelsList.innerHTML += chatMenu.channel("Six Group", 14)
        channelsList.innerHTML += chatMenu.channel("Test Channel", 150)
        channelsList.innerHTML += chatMenu.channelPrivate("Private channel", 8)

        let directMsgList = document.getElementById("direct-msgs-list")
        directMsgList.innerHTML += chatMenu.directMessages("Coolizh", 0)
        directMsgList.innerHTML += chatMenu.directMessages("Mukha", 2)

        let chatRoom = document.getElementById("chat-block")
        chatRoom.innerHTML += `<ul id="chat-messages"></ul>`

        let chatMsgList = document.getElementById("chat-messages")
        chatMsgList.innerHTML += chatWindow.firstMessage("Gnome", "9:54", "Hi bro)")
        chatMsgList.innerHTML += chatWindow.simpleMessage("How are you?")
        chatMsgList.innerHTML += chatWindow.firstMessage(user.displayName, "9:58", "Im fine thanks")
        chatMsgList.innerHTML += chatWindow.dateSeparator("August 21, 2020")
        chatMsgList.innerHTML += chatWindow.firstMessage("Gnome", "9:54", "Hi bro)")
    }
}

export default ChatPage;