"use strict";

const request = require("request");

class Login {

    static listen() {
        global.WebSuite.getWebSocketHandler().registerEvent("login", (socket, data, address) => {
            global.WebSuite.getDatabase().query("SELECT COUNT(*) AS count FROM wsFailedLogins WHERE ipAddress=? AND unixtime>=? AND type='login'", [address, TimeUtil.currentTime() - 6 * 60 * 60 * 1000]).then((count) => {
                if (parseInt(count[0].count) < 7) {
                    const secretKey = require("../../../config.json").secretKey;
                    const verifiyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${data.captcha}&remoteip=${address}`;

                    request(verifiyUrl, (err, response, body) => {
                        body = JSON.parse(body);

                        if (body.success !== undefined && !body.success) {
                            global.WebSuite.getWebSocketHandler().sendToClient(socket, "login", {
                                err: "captcha failed",
                                id: -1
                            });
                            this.addToBlocklist(address, false);
                            return;
                        }

                        global.WebSuite.getUserHandler().getUserByUserName(data.username).then((user) => {
                            const userID = user.getUserID();

                            global.WebSuite.getDatabase().query("SELECT * FROM wsUser WHERE userID=?", [userID]).then((password) => {
                                global.FileUtil.readFile(`${global._dir}/data/userSalts.json`).then((salts) => {
                                    salts = JSON.parse(salts);

                                    if (salts[userID] === undefined) {
                                        global.WebSuite.getWebSocketHandler().sendToClient(socket, "login", {
                                            err: "no data found",
                                            id: 0
                                        });
                                        return;
                                    }

                                    if (global.CryptoUtil.matchPassword(data.password, password[0].password, salts[userID])) {
                                        let sessionID = Date.now().toString(36) + "_";
                                        // Can this generate the same sessionID multiple times?
                                        const possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-";
                                        for (let i = 0; i < 32; i++) {
                                            sessionID += possible.charAt(Math.floor(Math.random() * possible.length));
                                        }

                                        let expire = -1;
                                        if (data.stay) {
                                            expire = Date.now() + 90 * 24 * 60 * 60 * 1000;
                                        } else {
                                            expire = Date.now() + 8 * 60 * 60 * 1000;
                                        }

                                        global.WebSuite.getDatabase().query("INSERT INTO wsUserSessions(sessionID, userID, sessionDescription, expires, clientID, stay) VALUES (?, ?, ?, ?, ?, ?)", [sessionID, userID, address, expire, socket, data.stay]).then(() => {
                                            global.WebSuite.getWebSocketHandler().sendToClient(socket, "login", {
                                                userID,
                                                username: password[0].username,
                                                sessionID,
                                                stay: data.stay
                                            });
                                        }).catch((err) => {
                                            global.WebSuite.getWebSocketHandler().sendToClient(socket, "login", {
                                                err: "servererror",
                                                id: -1
                                            });
                                            global.WebSuite.getLogger().error(err);
                                        });
                                    } else {
                                        global.WebSuite.getWebSocketHandler().sendToClient(socket, "login", {
                                            err: "no data found",
                                            id: 0
                                        });
                                        this.addToBlocklist(address, false);
                                    }
                                }).catch((err) => {
                                    global.WebSuite.getWebSocketHandler().sendToClient(socket, "login", {
                                        err: "servererror",
                                        id: -1
                                    });
                                    global.WebSuite.getLogger().error(err);
                                });
                            }).catch((err) => {
                                global.WebSuite.getWebSocketHandler().sendToClient(socket, "login", {
                                    err: "servererror",
                                    id: -1
                                });
                                global.WebSuite.getLogger().error(err);
                            });
                        }).catch((err) => {
                            if(err.message === "no data found") {
                                global.WebSuite.getWebSocketHandler().sendToClient(socket, "login", {
                                    err: "no data found",
                                    id: 0
                                });
                            } else {
                                global.WebSuite.getWebSocketHandler().sendToClient(socket, "login", {
                                    err: "servererror",
                                    id: -1
                                });
                                global.WebSuite.getLogger().error(err);
                            }
                        });
                    });
                } else {
                    global.WebSuite.getWebSocketHandler().sendToClient(socket, "login", {err: "blocked by server", id: -1});
                }
            }).catch((err) => {
                global.WebSuite.getWebSocketHandler().sendToClient(socket, "login", {err: "servererror", id: -1});
                global.WebSuite.getLogger().error(err);
            });
        });

        global.WebSuite.getWebSocketHandler().registerEvent("auto-login", (socket, data, address) => {
            global.WebSuite.getDatabase().query("SELECT COUNT(*) AS count FROM wsFailedLogins WHERE ipAddress=? AND unixtime>=? AND type='autologin'", [address, TimeUtil.currentTime() - 24 * 60 * 60 * 1000]).then((count) => {
                if(parseInt(count[0].count) < 3) {
                    global.WebSuite.getUserHandler().getUserByUserID(data.userID).then((user) => {
                        const userID = user.getUserID();

                        global.WebSuite.getDatabase().query("SELECT * FROM wsUserSessions WHERE userID=? AND sessionID=?", [userID, data.sessionID]).then((session) => {
                            if (session === undefined || session[0] === undefined || session[0].expires === undefined) {
                                global.WebSuite.getWebSocketHandler().sendToClient(socket, "auto-login", {
                                    err: "no data found",
                                    id: 0
                                });
                                this.addToBlocklist(address, true);
                                return;
                            }

                            if(session[0].expires < Date.now()) {
                                global.WebSuite.getWebSocketHandler().sendToClient(socket, "auto-login", {
                                    err: "session expired",
                                    id: 1
                                });
                                return;
                            }

                            global.WebSuite.getDatabase().query("SELECT username FROM wsUser WHERE userID = ?", [userID]).then((username) => {
                                if(username === undefined || username[0] === undefined || username[0].username === undefined) {
                                    return;
                                }

                                let expires = -1;
                                if(session[0].stay === 1) {
                                    expires = Date.now() + 90 * 24 * 60 * 60 * 1000;
                                } else {
                                    expires = Date.now() + 8 * 60 * 60 * 1000;
                                }

                                global.WebSuite.getDatabase().query("UPDATE wsUserSessions SET expires=?, clientID=? WHERE userID=? AND sessionID=?", [expires, socket, userID, data.sessionID]).then((success) => {
                                    global.WebSuite.getWebSocketHandler().sendToClient(socket, "auto-login", {
                                        userID: userID,
                                        sessionID: session[0].sessionID,
                                        username: username[0].username,
                                        stay: session[0].stay
                                    });
                                }).catch((err) => {
                                    global.WebSuite.getWebSocketHandler().sendToClient(socket, "auto-login", {
                                        err: "servererror",
                                        id: -1
                                    });
                                    global.WebSuite.getLogger().error(err);
                                });
                            }).catch((err) => {
                                global.WebSuite.getLogger().error(err);
                                global.WebSuite.getWebSocketHandler().sendToClient(socket, "auto-login", {
                                    err: "servererror",
                                    id: -1
                                });
                            });
                        }).catch((err) => {
                            global.WebSuite.getWebSocketHandler().sendToClient(socket, "auto-login", {
                                err: "servererror",
                                id: -1
                            });
                            global.WebSuite.getLogger().error(err);
                        });
                    }).catch((err) => {
                        if (err.message === "no data found") {
                            global.WebSuite.getWebSocketHandler().sendToClient(socket, "auto-login", {
                                err: "no data found",
                                id: 0
                            });
                        } else {
                            global.WebSuite.getWebSocketHandler().sendToClient(socket, "auto-login", {
                                err: "servererror",
                                id: -1
                            });
                            global.WebSuite.getLogger().error(err);
                        }
                    });
                } else {
                    global.WebSuite.getWebSocketHandler().sendToClient(socket, "auto-login", {err: "blocked by server", id: -1});
                }
            }).catch((err) => {
                global.WebSuite.getWebSocketHandler().sendToClient(socket, "auto-login", {err: "servererror", id: -1});
                global.WebSuite.getLogger().error(err);
            });
        });

        global.WebSuite.getWebSocketHandler().registerEvent("disconnect", (socket, data) => {
            global.WebSuite.getDatabase().query("UPDATE wsUserSessions SET clientID=null WHERE clientID=?", [socket]).then(() => {}).catch((err) => {
                global.WebSuite.getLogger().error(err);
            });
        });
    }

    /**
     * @private
     * */
    static addToBlocklist(ipAddress, autologin) {
        let type = "login";
        if(autologin === true) {
            type = "autologin";
        }

        WebSuite.getDatabase().query("INSERT INTO wsFailedLogins(ipAddress, unixtime, type) VALUES (?, ?, ?)", [ipAddress, Date.now(), type]).then(() => {
            WebSuite.getLogger().info("Added "+ ipAddress + " to local blocklist");
        }).catch((err) => {
            WebSuite.getLogger().error(err);
        });
    }

}

module.exports = Login;