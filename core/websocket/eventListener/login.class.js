"use strict";

const request = require("request");

class Login {

	static listen() {
		WebSuite.getWebSocketHandler().registerEvent("login", (socket, data, address) => {
			WebSuite.getDatabase().query("SELECT COUNT(*) AS count FROM wsFailedLogins WHERE ipAddress=? AND unixtime>=? AND type='login'", [address, global.TimeUtil.currentTime() - 6 * 60 * 60 * 1000]).then((count) => {
				if (parseInt(count[0].count) < 7) {
					const secretKey = require(_config).secretKey;
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

										// TODO
										const securityToken = socket;

										WebSuite.getDatabase().query("INSERT INTO wsUserSessions(sessionID, userID, sessionDescription, expires, securityToken, stay) VALUES (?, ?, ?, ?, ?, ?)", [sessionID, userID, address, expire, securityToken, data.stay]).then(() => {
											WebSuite.getWebSocketHandler().sendToClient(socket, "login", {
												userID,
												username: password[0].username,
												sessionID,
												securityToken
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
	}

	/**
	 * @private
	 * */
	static addToBlocklist(ipAddress) {
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