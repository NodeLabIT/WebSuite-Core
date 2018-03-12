"use strict";

const User = require("./User.class");
const GuestGroup = require("./GuestGroup.class");

class UserHandler {

    /**
     * Get a user by his userID
     *
     * @param userID userID of User you want tot work with
     * */
    getUserByUserID(userID) {
        return new Promise((resolve, reject) => {
            global.WebSuite.getDatabase().query("SELECT * FROM wsUser WHERE userID=?", [userID]).then(result => {
                if(result === undefined || result[0] === undefined || result[0].userID === undefined) {
                    reject(new Error("no data found"));
                } else {
                    resolve(new User(result[0].userID));
                }
            }).catch(err => {
                reject(new Error("no data found"));
            });
        });
    }

    /**
     * Get a user by his username
     *
     * @param userName user-name of User you want tot work with
     * */
    getUserByUserName(userName) {
        return new Promise((resolve, reject) => {
            global.WebSuite.getDatabase().query("SELECT * FROM wsUser WHERE username=?", [userName]).then(result => {
                if(result === undefined || result[0] === undefined || result[0].userID === undefined) {
                    reject(new Error("no data found"));
                } else {
                    resolve(new User(result[0].userID));
                }
            }).catch(err => {
                reject(new Error("no data found"));
            });
        });
    }

    /**
     * Get a user by his email-address
     *
     * @param email email-address of User you want tot work with
     * */
    getUserByEMail(email) {
        return new Promise((resolve, reject) => {
            global.WebSuite.getDatabase().query("SELECT * FROM wsUser WHERE email=?", [email]).then(result => {
                if(result === undefined || result[0] === undefined || result[0].userID === undefined) {
                    reject(new Error("no data found"));
                } else {
                    resolve(new User(result[0].userID));
                }
            }).catch(err => {
                reject(new Error("no data found"));
            });
        });
    }

    getGuestGroup() {
        return GuestGroup;
    }

}

module.exports = new UserHandler();