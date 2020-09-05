let SignInPage = {
    render: async () => {
        let view = `
                    <div class="register-div">
                        <section class="reg-welcome-section">
                            <p class="welcome-section-text">Welcome back</p>
                            <img class="welcome-section-img-login" src="img/login_icon.webp" alt="registration form">
                        </section>
                        <form id="form-login">
                            <input type="email" placeholder="Email" required>
                            <input type="password" placeholder="Password" required>
                            <input class="form-submit-button" type="submit" value="Sign In">
                        </form>
                        <section class="section-account">
                            <p class="section-account-text">Dont have an account?</p>
                            <a class="section-account-link" href="">Sign Up</a>
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
            console.log(formValues["email"])
            console.log(formValues["pass"])
            // Router._instance.navigate('/login')
            login(formValues)
        })
    }
}

function login(values) {
}

export default SignInPage;