'use strict';

const crypto = require('crypto');
const request = require('request');

class Login {

    static listen() {
        WebSuite.getWebSocketHandler().registerEvent('login', (socket, data, address) => {
            WebSuite.getDatabase().query("SELECT COUNT(*) as count FROM wsFailedLogins WHERE ipAddress=? AND unixtime>=?", [address, TimeUtil.currentTime() - 24 * 60 * 60 * 1000]).then(count => {
                if(parseInt(count[0].count) < 10) {
                    const secretKey = require('../../../config.json').secretKey;
                    const verifiyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${data.captcha}&remoteip=${address}`;

                    request(verifiyUrl, (err, response, body) => {
                        body = JSON.parse(body);

                        if(body.success !== undefined && !body.success) {
                            WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {err: "captcha failed", id: -1});
                            return;
                        }

                        WebSuite.getUserHandler().getUserByUserName(data.username).then(user => {
                            console.log(user.getUserID());
                            const userID = user.getUserID();

                            WebSuite.getDatabase().query("SELECT password FROM wsUser WHERE userID=?", [userID]).then(password => {
                                FileUtil.readFile(_dir + "/data/userSalts.json").then(salts => {
                                    salts = JSON.parse(salts);

                                    if(salts[userID] === undefined) {
                                        WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {err: "no data found", id: 0});
                                        return;
                                    }

                                    if(CryptoUtil.matchPassword(data.password, password[0].password, salts[userID])) {
                                        let sessionID = "";
                                        // Can this generate the same sessionID multiple times?
                                        const possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-";
                                        for(let i = 0; i < 32; i++) {
                                            sessionID += possible.charAt(Math.floor(Math.random() * possible.length));
                                        }

                                        WebSuite.getDatabase().query("INSERT INTO wsUserSessions(sessionID, userID, sessionDescription) VALUES (?, ?, ?)", [sessionID, userID, address]).then(() => {
                                            WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {userID, sessionID});
                                        }).catch(err => {
                                            WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {err: "servererror", id: -1});
                                        });
                                    } else {
                                        WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {err: "no data found", id: 0});
                                    }
                                }).catch(err => {
                                    WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {err: "servererror", id: -1});
                                });
                            }).catch(err => {
                                WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {err: "servererror", id: -1});
                            });
                        }).catch(err => {
                            if(err.message === 'no data found') {
                                WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {err: "no data found", id: 0});
                            } else {
                                WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {err: "servererror", id: -1});
                            }
                        });
                    });
                } else {
                    WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {err: "blocked by server", id: -1});
                }
            }).catch(err => {
                WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {err: "servererror", id: -1});
            });
        });

        WebSuite.getWebSocketHandler().registerEvent('auto-login', (socket, data) => {

        });
    }

}

module.exports = Login;