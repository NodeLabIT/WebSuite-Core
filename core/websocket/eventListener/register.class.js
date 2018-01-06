'use strict';

const request = require('request');

class Register {

    static listen() {
        WebSuite.getWebSocketHandler().registerEvent('register', (socket, data, address) => {
            WebSuite.getDatabase().query("SELECT COUNT(*) AS count FROM wsFailedLogins WHERE ipAddress=? AND unixtime>=? AND type='registration'", [address, TimeUtil.currentTime() - 12 * 60 * 60 * 1000]).then(count => {
                if (parseInt(count[0].count) < 3) {
                    const secretKey = require('../../../config.json').secretKey;
                    const verifiyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${data.captcha}&remoteip=${address}`;

                    request(verifiyUrl, (err, response, body) => {
                        body = JSON.parse(body);

                        if (body.success !== undefined && !body.success) {
                            WebSuite.getWebSocketHandler().sendToClient(socket, 'register', {
                                err: "captcha failed",
                                id: -1
                            });
                            this.addToBlocklist(address, false);
                            return;
                        }

                        // TODO: Registration
                        UserUtil.usernameValid(data.username).then(() => {
                            UserUtil.emailValid(data.email).then(() => {
                                UserUtil.usernameAvailable(data.username).then(() => {
                                    UserUtil.emailAvailable(data.email).then(() => {
                                        const salt = CryptoUtil.generateSalt(64);
                                        const password = CryptoUtil.hashPassword(data.password, salt);
                                        WebSuite.getDatabase().query("INSERT INTO wsUser(username, email, password) VALUES(?, ?, ?)", [data.username, data.email, password]).then(insert => {
                                            const userID = insert.insertId;

                                            FileUtil.readFile(_dir + '/data/userSalts.json').then(userSalts => {
                                                userSalts = JSON.parse(userSalts);
                                                userSalts.push({userID: salt});

                                                FileUtil.saveFile(_dir + '/data/userSalts.json', JSON.stringify(userSalts, null, 2)).then(saved => {
                                                    // success
                                                }).catch(err => {
                                                    // TODO
                                                });
                                            }).catch(err => {
                                                // TODO
                                            });
                                        }).catch(err => {
                                            // TODO
                                        });
                                    }).catch(err => {
                                        // TODO
                                    });
                                }).catch(err => {
                                    // TODO
                                });
                            }).catch(err => {
                                // TODO
                            });
                        }).catch(err => {
                            // TODO
                        });
                    });
                } else {
                    WebSuite.getWebSocketHandler().sendToClient(socket, 'register', {
                        err: "blocked by server",
                        id: -1
                    });
                }
            }).catch(err => {
                WebSuite.getWebSocketHandler().sendToClient(socket, 'register', {
                    err: "servererror",
                    id: -1
                });
                WebSuite.getLogger().error(err);
            });
        });
    }

    /**
     * @private
     * */
    static addToBlocklist(ipAddress) {
        WebSuite.getDatabase().query("INSERT INTO wsFailedLogins(ipAddress, unixtime, type) VALUES (?, ?, ?)", [ipAddress, Date.now(), "registration"]).then(success => {
            WebSuite.getLogger().info("Added "+ ipAddress + " to local blocklist");
        }).catch(err => {
            WebSuite.getLogger().error(err);
        });
    }

}

module.exports = Login;