"use strict";

const request = require("request");

class Register {

	static listen() {
		WebSuite.getWebSocketHandler().registerEvent("register", (socket, data, address) => {
			console.log("Die Ableitung von e^x ist e^x");
			WebSuite.getDatabase().query("SELECT COUNT(*) AS count FROM wsFailedLogins WHERE ipAddress=? AND unixtime>=? AND type='registration'", [address, global.TimeUtil.currentTime() - 12 * 60 * 60 * 1000]).then((count) => {
				if (parseInt(count[0].count) < 3) {
					const secretKey = require("../../../config.json").secretKey;
					const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${data.captcha}&remoteip=${address}`;

					request(verifyUrl, (err, response, body) => {
						body = JSON.parse(body);

						if (body.success !== undefined && !body.success) {
							WebSuite.getWebSocketHandler().sendToClient(socket, "register", {
								err: "captcha failed",
								id: -1
							});
							this.addToBlocklist(address, false);
							return;
						}

						global.UserUtil.usernameValid(data.username).then(() => {
							global.UserUtil.emailValid(data.email).then(() => {
								global.UserUtil.usernameAvailable(data.username).then(() => {
									global.UserUtil.emailAvailable(data.email).then(async () => {

										const hash = await CryptoUtil.hash(data.password);
										WebSuite.getDatabase().query("INSERT INTO wsUser(username, email, password) VALUES(?, ?, ?)", [data.username, data.email, hash]).then((insert) => {
											const userID = insert.insertId;
												let sessionID = Date.now().toString(36) + "_";
												// Can this generate the same sessionID multiple times?
												const possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-";
												for (let i = 0; i < 32; i++) {
													sessionID += possible.charAt(Math.floor(Math.random() * possible.length));
												}

												let expire = Date.now() + 8 * 60 * 60 * 1000;
												WebSuite.getDatabase().query("INSERT INTO wsUserSessions(sessionID, userID, sessionDescription, expires, securityToken) VALUES (?, ?, ?, ?, ?)", [sessionID, userID, "new device", expire, socket]).then((session) => {
													WebSuite.getWebSocketHandler().sendToClient(socket, "register", {
														userID: userID,
														username: data.username,
														sessionID: sessionID
													});
												}).catch((err) => {
													WebSuite.getWebSocketHandler().sendToClient(socket, "register", {
														err: "servererror",
														id: -1
													});
													WebSuite.getLogger().error(err);
												});
										}).catch((err) => {
											WebSuite.getWebSocketHandler().sendToClient(socket, "register", {
												err: "servererror",
												id: -1
											});
											WebSuite.getLogger().error(err);
										});
									}).catch((err) => {
										if(err.message === "email not available") {
											WebSuite.getWebSocketHandler().sendToClient(socket, "register", {
												err: "email-not-available",
												id: 0
											});
										} else {
											WebSuite.getWebSocketHandler().sendToClient(socket, "register", {
												err: "servererror",
												id: -1
											});
										}
										WebSuite.getLogger().error(err);
									});
								}).catch((err) => {
									if(err.message === "username not available") {
										WebSuite.getWebSocketHandler().sendToClient(socket, "register", {
											err: "username-not-available",
											id: 0
										});
									} else {
										WebSuite.getWebSocketHandler().sendToClient(socket, "register", {
											err: "servererror",
											id: -1
										});
									}
									WebSuite.getLogger().error(err);
								});
							}).catch((err) => {
								if(err.message === "email length mismatch") {
									WebSuite.getWebSocketHandler().sendToClient(socket, "register", {
										err: "email-length-mismatch",
										id: 0
									});
								} else if(err.message === "email character mismatch") {
									WebSuite.getWebSocketHandler().sendToClient(socket, "register", {
										err: "email-character-mismatch",
										id: 0
									});
								} else if(err.message === "email whitespace mismatch") {
									WebSuite.getWebSocketHandler().sendToClient(socket, "register", {
										err: "email-whitespace-mismatch",
										id: 0
									});
								} else {
									WebSuite.getWebSocketHandler().sendToClient(socket, "register", {
										err: "servererror",
										id: -1
									});
								}
								WebSuite.getLogger().error(err);
							});
						}).catch((err) => {
							if(err.message === "username length mismatch") {
								WebSuite.getWebSocketHandler().sendToClient(socket, "register", {
									err: "username-length-mismatch",
									id: 0
								});
							} else if(err.message === "username character mismatch") {
								WebSuite.getWebSocketHandler().sendToClient(socket, "register", {
									err: "username-character-mismatch",
									id: 0
								});
							} else if(err.message === "username whitespace mismatch") {
								WebSuite.getWebSocketHandler().sendToClient(socket, "register", {
									err: "username-whitespace-mismatch",
									id: 0
								});
							} else {
								WebSuite.getWebSocketHandler().sendToClient(socket, "register", {
									err: "servererror",
									id: -1
								});
							}
							WebSuite.getLogger().error(err);
						});
					});
				} else {
					WebSuite.getWebSocketHandler().sendToClient(socket, "register", {
						err: "blocked by server",
						id: -1
					});
				}
			}).catch((err) => {
				WebSuite.getWebSocketHandler().sendToClient(socket, "register", {
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
		WebSuite.getDatabase().query("INSERT INTO wsFailedLogins(ipAddress, unixtime, type) VALUES (?, ?, ?)", [ipAddress, Date.now(), "registration"]).then(() => {
			WebSuite.getLogger().info("Added "+ ipAddress + " to local blocklist");
		}).catch((err) => {
			WebSuite.getLogger().error(err);
		});
	}

}

module.exports = Register;