'use strict';

class User {

    constructor(userID, callback) {
        this.userID = userID;
        WebSuite.getDatabase().query("SELECT * FROM wsUser WHERE userID=?", [userID]).then(result => {
            this.userAccountInformation = result[0];
            callback(true);
        }).catch(err => {
            // TODO: Handle error
            callback(false);
        });
    }

    getUserID() {
        return this.userAccountInformation.userID;
    }

    getUsername() {
        return this.userAccountInformation.username;
    }

    getUserMail() {
        return this.userAccountInformation.email;
    }

}

module.exports = User;