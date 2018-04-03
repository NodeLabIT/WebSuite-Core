"use strict";

const User = require("../user/User.class");

class Sessions {

    static getUserBySessionID(sessionID) {
        return new Promise((resolve, reject) => {
            global.WebSuite.getDatabase().query("SELECT * FROM wsUserSessions WHERE sessionID=?", [sessionID]).then((result) => {
                if(typeof result === "undefined" || typeof result[0] === "undefined" || typeof result[0].userID === "undefined") {
                    resolve(null);
                } else {
                    resolve(new User(result[0].userID));
                }
            }).catch((err) => {
                reject(new Error("no data found"));
            });
        });
    }

    static getUserByClientID(clientID) {
        return new Promise((resolve, reject) => {
            global.WebSuite.getDatabase().query("SELECT * FROM wsUserSessions WHERE clientID=?", [clientID]).then((result) => {
                if(typeof result === "undefined" || typeof result[0] === "undefined" || typeof result[0].userID === "undefined") {
                    resolve(null);
                } else {
                    resolve(new User(result[0].userID));
                }
            }).catch((err) => {
                reject(new Error("no data found"));
            });
        });
    }

    static getSessionIDByUserID(userID) {
        return new Promise((resolve, reject) => {
            global.WebSuite.getDatabase().query("SELECT * FROM wsUserSessions WHERE userID=?", [userID]).then((result) => {
                if(typeof result === "undefined" || typeof result[0] === "undefined" || typeof result[0].sessionID === "undefined") {
                    resolve(null);
                } else {
                    resolve(result[0].sessionID);
                }
            }).catch((err) => {
                reject(new Error("no data found"));
            });
        });
    }

}

module.exports = Sessions;