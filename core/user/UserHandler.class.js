'use strict';

const User = require('./User.class');

class UserHandler {

    /**
     * @param userID userID of User you want tot work with
     * */
    getUserByUserID(userID) {
        return new Promise((resolve, reject) => {
            WebSuite.getDatabase().query("SELECT * FROM wsUser WHERE userID=?", [userID]).then(result => {
                const user = new User(result[0].userID, success => {
                    if(success) {
                        resolve(user);
                    } else {
                        reject();
                    }
                });
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * @param userName user-name of User you want tot work with
     * */
    getUserByUserName(userName) {
        return new Promise((resolve, reject) => {
            WebSuite.getDatabase().query("SELECT * FROM wsUser WHERE username=?", [userName]).then(result => {
                const user = new User(result[0].userID, success => {
                    if(success) {
                        resolve(user);
                    } else {
                        reject();
                    }
                });
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * @param email email-address of User you want tot work with
     * */
    getUserByEMail(email) {
        return new Promise((resolve, reject) => {
            WebSuite.getDatabase().query("SELECT * FROM wsUser WHERE email=?", [email]).then(result => {
                const user = new User(result[0].userID, success => {
                    if(success) {
                        resolve(user);
                    } else {
                        reject();
                    }
                });
            }).catch(err => {
                reject(err);
            });
        });
    }

}

module.exports = new UserHandler();