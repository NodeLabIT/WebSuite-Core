"use strict";

const request = require("request");

class Login {

	static listen() {
		WebSuite.getWebSocketHandler().registerEvent("login", (socket, data, address) => {
			WebSuite.getDatabase().query("SELECT COUNT(*) AS count FROM wsFailedLogins WHERE ipAddress=? AND unixtime>=? AND type='login'", [address, global.TimeUtil.currentTime() - 6 * 60 * 60 * 1000]).then((count) => {
				if (parseInt(count[0].count) < 7) {
					const secretKey = require("../../../config.json").secretKey;
					const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${data.captcha}&remoteip=${address}`;

					request(verifyUrl, (err, response, body) => {
						body = JSON.parse(body);

						if (typeof body.success !== "undefined" && !body.success) {
							WebSuite.getWebSocketHandler().sendToClient(socket, "login", {
								err: "captcha failed",
								id: -1
							});
							this.addToBlocklist(address, false);
							return;
						}

						WebSuite.getUserHandler().getUserByUserName(data.username).then((user) => {
							const userID = user.getUserID();

							WebSuite.getDatabase().query("SELECT * FROM wsUser WHERE userID=?", [userID]).then(async (password) => {
								try {
									if(await CryptoUtil.verify(password[0].password, data.password)) {
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

										WebSuite.getDatabase().query("INSERT INTO wsUserSessions(sessionID, userID, sessionDescription, expires, clientID, stay) VALUES (?, ?, ?, ?, ?, ?)", [sessionID, userID, address, expire, socket, data.stay]).then(() => {
											WebSuite.getWebSocketHandler().sendToClient(socket, "login", {
												userID,
												username: password[0].username,
												sessionID,
												stay: data.stay
											});
										}).catch((err) => {
											WebSuite.getWebSocketHandler().sendToClient(socket, "login", {
												err: "servererror",
												id: -1
											});
											WebSuite.getLogger().error(err);
										});
									} else {
										WebSuite.getWebSocketHandler().sendToClient(socket, "login", {
											err: "no data found",
											id: 0
										});
										this.addToBlocklist(address, false);
									}
								} catch(err) {
									WebSuite.getWebSocketHandler().sendToClient(socket, "login", {
										err: "servererror",
										id: -1
									});
									WebSuite.getLogger().error(err);
								}
							}).catch((err) => {
								WebSuite.getWebSocketHandler().sendToClient(socket, "login", {
									err: "servererror",
									id: -1
								});
								WebSuite.getLogger().error(err);
							});
						}).catch((err) => {
							if(err.message === "no data found") {
								WebSuite.getWebSocketHandler().sendToClient(socket, "login", {
									err: "no data found",
									id: 0
								});
							} else {
								WebSuite.getWebSocketHandler().sendToClient(socket, "login", {
									err: "servererror",
									id: -1
								});
								WebSuite.getLogger().error(err);
							}
						});
					});
				} else {
					WebSuite.getWebSocketHandler().sendToClient(socket, "login", {err: "blocked by server", id: -1});
				}
			}).catch((err) => {
				WebSuite.getWebSocketHandler().sendToClient(socket, "login", {err: "servererror", id: -1});
				WebSuite.getLogger().error(err);
			});
		});

		/**WebSuite.getWebSocketHandler().registerEvent("auto-login", (socket, data, address) => {
			WebSuite.getDatabase().query("SELECT COUNT(*) AS count FROM wsFailedLogins WHERE ipAddress=? AND unixtime>=? AND type='autologin'", [address, global.TimeUtil.currentTime() - 24 * 60 * 60 * 1000]).then((count) => {
				if(parseInt(count[0].count) < 3) {
					WebSuite.getUserHandler().getUserByUserID(data.userID).then((user) => {
						const userID = user.getUserID();

						WebSuite.getDatabase().query("SELECT * FROM wsUserSessions WHERE userID=? AND sessionID=?", [userID, data.sessionID]).then((session) => {
							if (typeof session === "undefined" || typeof session[0] === "undefined" || typeof session[0].expires === "undefined") {
								WebSuite.getWebSocketHandler().sendToClient(socket, "auto-login", {
									err: "no data found",
									id: 0
								});
								this.addToBlocklist(address, true);
								return;
							}

							if(session[0].expires < Date.now()) {
								WebSuite.getWebSocketHandler().sendToClient(socket, "auto-login", {
									err: "session expired",
									id: 1
								});
								return;
							}

							WebSuite.getDatabase().query("SELECT username FROM wsUser WHERE userID = ?", [userID]).then((username) => {
								if(typeof username === "undefined" || typeof username[0] === "undefined" || typeof username[0].username === "undefined") {
									return;
								}

								let expires = -1;
								if(session[0].stay === 1) {
									expires = Date.now() + 90 * 24 * 60 * 60 * 1000;
								} else {
									expires = Date.now() + 8 * 60 * 60 * 1000;
								}

								WebSuite.getDatabase().query("UPDATE wsUserSessions SET expires=?, clientID=? WHERE userID=? AND sessionID=?", [expires, socket, userID, data.sessionID]).then((success) => {
									WebSuite.getWebSocketHandler().sendToClient(socket, "auto-login", {
										userID: userID,
										sessionID: session[0].sessionID,
										username: username[0].username,
										stay: session[0].stay
									});
								}).catch((err) => {
									WebSuite.getWebSocketHandler().sendToClient(socket, "auto-login", {
										err: "servererror",
										id: -1
									});
									WebSuite.getLogger().error(err);
								});
							}).catch((err) => {
								WebSuite.getLogger().error(err);
								WebSuite.getWebSocketHandler().sendToClient(socket, "auto-login", {
									err: "servererror",
									id: -1
								});
							});
						}).catch((err) => {
							WebSuite.getWebSocketHandler().sendToClient(socket, "auto-login", {
								err: "servererror",
								id: -1
							});
							WebSuite.getLogger().error(err);
						});
					}).catch((err) => {
						if (err.message === "no data found") {
							WebSuite.getWebSocketHandler().sendToClient(socket, "auto-login", {
								err: "no data found",
								id: 0
							});
						} else {
							WebSuite.getWebSocketHandler().sendToClient(socket, "auto-login", {
								err: "servererror",
								id: -1
							});
							WebSuite.getLogger().error(err);
						}
					});
				} else {
					WebSuite.getWebSocketHandler().sendToClient(socket, "auto-login", {err: "blocked by server", id: -1});
				}
			}).catch((err) => {
				WebSuite.getWebSocketHandler().sendToClient(socket, "auto-login", {err: "servererror", id: -1});
				WebSuite.getLogger().error(err);
			});
		});*/

		WebSuite.getWebSocketHandler().registerEvent("disconnect", (socket, data) => {
			WebSuite.getDatabase().query("UPDATE wsUserSessions SET clientID=null WHERE clientID=?", [socket]).then(() => {}).catch((err) => {
				WebSuite.getLogger().error(err);
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

		WebSuite.getDatabase().query("INSERT INTO wsFailedLogins(ipAddress, unixtime, type) VALUES (?, ?, ?)", [ipAddress, global.TimeUtil.currentTime(), type]).then(() => {
			WebSuite.getLogger().info("Added "+ ipAddress + " to local blocklist");
		}).catch((err) => {
			WebSuite.getLogger().error(err);
		});
	}

}

module.exports = Login;