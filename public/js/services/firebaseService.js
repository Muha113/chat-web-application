class FirebaseService {

    // async readUserData({uid}) {
    //     const snapshot = await firebase.database().ref("users/").child(uid).once("value");
    //     const data = snapshot.val();
    //     return data;
    // }

    usersRef() {
        return firebase.database().ref("/users");
    }

    async writeUserData({uid}, email, username) {
        await this.usersRef().child(uid).set(
            {
                email: email,
                username: username,
                // name: name,
                // surname: surname,
            }
        );
    }
}

export default FirebaseService