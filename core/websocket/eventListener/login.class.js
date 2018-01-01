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
                            WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {err: new Error('captcha failed'), step: 7});
                            return;
                        }

                        WebSuite.getUserHandler().getUserByUserName(data.username).then(user => {
                            const userID = user.getUserID();

                            WebSuite.getDatabase().query("SELECT password FROM wsUser WHERE userID=?", [userID]).then(password => {
                                FileUtil.readFile(_dir + "/data/userSalts.json").then(salts => {
                                    salts = JSON.parse(salts);

                                    if(CryptoUtil.matchPassword(data.password, password[0].password, salts[userID])) {
                                        // TODO: Login
                                        const sessionID = crypto.randomBytes(16).toString('hex');

                                        WebSuite.getDatabase().query("INSERT INTO wsUserSessions(sessionID, userID, sessionDescription) VALUES (?, ?, ?)", [sessionID, userID, address]).then(() => {
                                            WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {userID, sessionID});
                                        }).catch(err => {
                                            WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {err, step: 6});
                                        });
                                    } else {
                                        WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {err: new Error('no data found'), step: -1});
                                    }
                                }).catch(err => {
                                    WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {err, step: 4});
                                });
                            }).catch(err => {
                                WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {err, step: 3});
                            });
                        }).catch(err => {
                            if(err.message === 'no data found') {
                                WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {err, step: -1});
                            } else {
                                WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {err, step: 2});
                            }
                        });
                    });
                } else {
                    WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {err: new Error('blocked-by-server'), step: 1});
                }
            }).catch(err => {
                WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {err, step: 0});
            });
        });

        WebSuite.getWebSocketHandler().registerEvent('auto-login', (socket, data) => {

        });
    }

}

module.exports = Login;