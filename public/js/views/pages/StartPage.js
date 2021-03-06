// import {Router} from "../../Router.js"
import {linkNavigationHelper} from "../../helpers/linkNavigationHelper.js"

let StartPage = {
    render: async () => {
        let view = `
                    <header>
                        <img class="peramoga-icon" src="img/b4b.png" alt="b4b">
                        <p class="peramoga-title">PERAMOGA</p>
                        <nav class="header-links">
                            <a id="nav-login" href="/login">Sign In</a>
                            <a id="nav-reg" href="/register">Sign Up</a>
                        </nav>
                    </header>
                    <div class="intro">
                        <p class="intro-text">
                            This web chat was created for everyone who does not want to endure the current government anymore and searching for place to discuss it.
                        </p>
                        <p class="bel-live">
                            Жыве Беларусь!
                        </p>
                        <img class="peramoga-img" src="img/peramoga.jpg" alt="peramoga">
                    </div>
                    <hr class="hr-circle">
                    <p class="opportunities-text">Opportunities provided by chat :</p>
                    <div id="grid-chat-opportunities">
                        <!-- switch <p> to <figcaption> -->
                        <figure class="chat-opportunities">
                            <img src="img/zamochki.webp" alt="zamochki">
                            <p>Сreating public and private channels</p>
                        </figure>
                        <figure class="chat-opportunities">
                            <img src="img/chatimg.webp" alt="chatik">
                            <p>Сhatting with friends</p>
                        </figure>
                        <figure class="chat-opportunities">
                            <img src="img/enotik.webp" alt="en4ik">
                            <p>Send funny stikers</p>
                        </figure>
                    </div>
                    <footer>
                        <p>Made by Muha113</p>
                        <div class="footer-links">
                            <a href="">
                                <img src="img/github-icon.png" alt="github">
                            </a>
                            <a href="">
                                <img src="img/telegram-icon.png" alt="telegram">
                            </a>
                        </div>
                    </footer>`

        return view
    },
    after_render: async () => {
        document.getElementById('index-css-link').href = '../../../css/index.css'

        let navLogin = document.getElementById('nav-login')
        navLogin.addEventListener('click', (event) => {
            linkNavigationHelper(event)
        })

        let navReg = document.getElementById('nav-reg')
        navReg.addEventListener('click', (event) => {
            linkNavigationHelper(event)
        })
    }
}

export default StartPage;