"use strict";

class Init {

	static listen() {
		WebSuite.getWebSocketHandler().registerEvent("init", async (socket, data) => {
			try {
				if(typeof data.auth !== "boolean") {
					throw new Error("missing/faulty data in sent package");
					// TODO: Auth
				}

				let authInfo = {
					expired: false,
					error: null,
					user: null
				};

				auth:
				if(data.auth === true) {
					// TODO: add blocklist

					if(typeof data.user !== "object") {
						throw new Error("missing/faulty data in sent package");
					}


					const sessionI = await WebSuite.getDatabase().query("SELECT * FROM wsUserSessions WHERE userID=? AND sessionID=? AND securityToken=?", [data.user.userID, data.user.sessionID, data.user.securityToken]);

					// Check for saved session
					if(typeof sessionI[0] === "undefined") {
						authInfo.expired = true;
						break auth;
					}

					// Check for expired session
					if(sessionI[0].expires < TimeUtil.currentTime() === true) {
						await WebSuite.getDatabase().query("DELETE FROM wsUserSessions WHERE userID=? AND sessionID=? AND securityToken=?", [data.user.userID, data.user.sessionID, data.user.securityToken]);

						authInfo.expired = true;
						break auth;
					}

					const userI = await WebSuite.getDatabase().query("SELECT wsUser.userID, wsUser.username, wsUserProfile.avatarChanged FROM wsUser, wsUserProfile WHERE wsUser.userID = 1 AND wsUserProfile.userID = wsUser.userID;", [data.user.userID]);

					if(typeof userI[0] === "undefined") {
						throw new Error("missing database-entries");
					}

					process.send({type: "sioAuth", userID: userI[0].userID, socketID: socket});

					authInfo.user = {};
					authInfo.user['userID'] = userI[0].userID;
					authInfo.user['username'] = userI[0].username;
					authInfo.user['avatarUrlKey'] = userI[0].userID + "-" + userI[0].avatarChanged;
				}
				const pageOptions = JSON.parse(await FileUtil.readFile(`${_dir}/data/options.json`));

				// read more (important?!) data

				WebSuite.getWebSocketHandler().sendToClient(socket, "init", {
					page: {
						title: pageOptions.title,
						subtitle: pageOptions.subtitle
					},
					auth: authInfo
				});
			} catch(err) {
				console.error(err);
				// TODO: handle errors
			}
		});
	}

}

module.exports = Init;