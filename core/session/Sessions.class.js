'use strict';

const User = require('../user/User.class');

class Sessions {

    constructor() {}

    getUserBySessionID(sessionID) {
        return new Promise((resolve, reject) => {
            WebSuite.getDatabase().query("SELECT * FROM wsUserSessions WHERE sessionID=?", [sessionID]).then(result => {
                if(result === undefined || result[0] === undefined || result[0].userID === undefined) {
                    resolve(null);
                } else {
                    resolve(new User(result[0].userID));
                }
            }).catch(err => {
                reject(new Error('no data found'));
            });
        });
    }

    getUserByClientID(clientID) {
        return new Promise((resolve, reject) => {
            WebSuite.getDatabase().query("SELECT * FROM wsUserSessions WHERE clientID=?", [clientID]).then(result => {
                if(result === undefined || result[0] === undefined || result[0].userID === undefined) {
                    resolve(null);
                } else {
                    resolve(new User(result[0].userID));
                }
            }).catch(err => {
                reject(new Error('no data found'));
            });
        });
    }

    getSessionIDByUserID(userID) {
        return new Promise((resolve, reject) => {
            WebSuite.getDatabase().query("SELECT * FROM wsUserSessions WHERE userID=?", [userID]).then(result => {
                if(result === undefined || result[0] === undefined || result[0].sessionID === undefined) {
                    resolve(null);
                } else {
                    resolve(result[0].sessionID);
                }
            }).catch(err => {
                reject(new Error('no data found'));
            });
        });
    }

}

module.exports = new Sessions();