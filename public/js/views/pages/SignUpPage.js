import {parseForm} from "../../helpers/parseFrom.js"
import { Router } from "../../Router.js"
import {firebaseService} from "../../services/index.js"
import {linkNavigationHelper} from "../../helpers/linkNavigationHelper.js"

let SignUpPage = {
    render: async () => {
        let view = `
                    <div class="register-div">
                        <section class="reg-welcome-section">
                            <p class="welcome-section-text">Welcome</p>
                            <img class="welcome-section-img-register" src="img/register_icon.webp" alt="registration form">
                        </section>
                        <form id="form-reg">
                            <input name="username" type="text" placeholder="Username" required>
                            <input name="email" type="email" placeholder="Email" required>
                            <input name="pass" type="password" placeholder="Password" required>
                            <input name="conf-pass" type="password" placeholder="Confirm password" required>
                            <input id="submit-reg" class="form-submit-button" type="submit" value="Sign Up">
                        </form>
                        <section class="section-account">
                            <p class="section-account-text">Already have an account?</p>
                            <a id="have-acc-link" class="section-account-link" href="/login">Sign In</a>
                        </section>
                    </div>`

        return view
    },
    after_render: async () => {
        document.getElementById('index-css-link').href = '../../../css/enter-app.css'

        let form = document.getElementById('form-reg')
        form.addEventListener("submit", (event) => {
            event.preventDefault()
            let formValues = parseForm(form)

            if (formValues["pass"] != formValues["conf-pass"]) {
                alert("Wrong confirm password")
            } else {
                register(formValues)
            }
        })

        let haveAccLink = document.getElementById('have-acc-link')
        haveAccLink.addEventListener("click", (event) => {
            event.preventDefault()
            linkNavigationHelper(event)
        })
    }
}

function register(values) {
    const auth = firebase.auth();
    auth.createUserWithEmailAndPassword(values["email"], values["pass"])
        .then((res) => {
            return res.user.updateProfile({displayName: values["username"]})
                .then(() => {
                    firebaseService.createUser(auth.currentUser, values["email"], values["username"], "img/man.jpg");
                    localStorage.setItem("username", values["username"])
                    Router._instance.navigate("/chat");
                })
        }).catch(error => {
            alert(error);
        });
}

export default SignUpPage;