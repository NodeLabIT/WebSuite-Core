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
                            const userID = user.getUserID();

                            WebSuite.getDatabase().query("SELECT * FROM wsUser WHERE userID=?", [userID]).then(password => {
                                FileUtil.readFile(_dir + "/data/userSalts.json").then(salts => {
                                    salts = JSON.parse(salts);

                                    if(salts[userID] === undefined) {
                                        WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {err: "no data found", id: 0});
                                        return;
                                    }

                                    if(CryptoUtil.matchPassword(data.password, password[0].password, salts[userID])) {
                                        let sessionID = Date.now().toString(36) + "_";
                                        // Can this generate the same sessionID multiple times?
                                        const possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-";
                                        for(let i = 0; i < 32; i++) {
                                            sessionID += possible.charAt(Math.floor(Math.random() * possible.length));
                                        }

                                        let expire = -1;
                                        if(data.stay) {
                                            expire = Date.now() + 100 * 24 * 60 * 60 * 1000;
                                        } else {
                                            expire = Date.now() + 24 * 60 * 60 * 1000;
                                        }

                                        WebSuite.getDatabase().query("INSERT INTO wsUserSessions(sessionID, userID, sessionDescription, expires) VALUES (?, ?, ?, ?)", [sessionID, userID, address, expire]).then(() => {
                                            WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {userID, username: password[0].username, sessionID});
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

        WebSuite.getWebSocketHandler().registerEvent('auto-login', (socket, data, address) => {

        });
    }

}

module.exports = Login;