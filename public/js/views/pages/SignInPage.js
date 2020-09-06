import {parseForm} from "../../helpers/parseFrom.js"
import { Router } from "../../Router.js"
import {linkNavigationHelper} from "../../helpers/linkNavigationHelper.js"

let SignInPage = {
    render: async () => {
        let view = `
                    <div class="register-div">
                        <section class="reg-welcome-section">
                            <p class="welcome-section-text">Welcome back</p>
                            <img class="welcome-section-img-login" src="img/login_icon.webp" alt="registration form">
                        </section>
                        <form id="form-login">
                            <input name="email" type="email" placeholder="Email" required>
                            <input name="pass" type="password" placeholder="Password" required>
                            <input id="submit-login" class="form-submit-button" type="submit" value="Sign In">
                        </form>
                        <section class="section-account">
                            <p class="section-account-text">Dont have an account?</p>
                            <a id="create-acc-link" class="section-account-link" href="/register">Sign Up</a>
                        </section>
                    </div>`

        return view
    },
    after_render: async () => {
        document.getElementById('index-css-link').href = '../../../css/enter-app.css'

        let form = document.getElementById('form-login')
        form.addEventListener("submit", (event) => {
            event.preventDefault()
            let formValues = parseForm(form)

            login(formValues)
        })

        let createAccLink = document.getElementById('create-acc-link')
        createAccLink.addEventListener("click", (event) => {
            event.preventDefault()
            linkNavigationHelper(event)
        })
    }
}

function login(values) {
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(values["email"], values["pass"])
        .then(() => {
            Router._instance.navigate("/chat");
            // alert("Auth success")
        })
        .catch(error => {
            alert(error);
        });
}

export default SignInPage;