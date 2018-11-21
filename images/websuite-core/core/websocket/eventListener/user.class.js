"use strict";

class User {

	static listen() {
		WebSuite.getWebSocketHandler().registerEvent("user-list", async (socket, data) => {
			try {
				let userID = WebSuite.getSessions().getUserID(socket);

				let hasPermission = null;

				if(userID === undefined) {
					hasPermission = await WebSuite.getUserHandler().getGuestGroup().hasPermission("core.frontend.user.list");
				} else {
					hasPermission = await (await WebSuite.getUserHandler().getUserByUserID(userID)).hasPermission("core.frontend.user.list");
				}

				if(hasPermission === null)
					throw new Error("error checking permissions");

				if(hasPermission === false)
					throw new Error("permission denied");

				const users = await WebSuite.getDatabase().query("SELECT wsUser.userID, wsUser.username, wsGroup.groupName FROM wsUser, wsGroupUser, wsGroup WHERE wsUser.userID = wsGroupUser.userID AND wsGroup.groupID = wsGroupUser.groupID ORDER BY wsGroup.groupID ASC, username ASC;");

				WebSuite.getWebSocketHandler().sendToClient(socket, "user-list", {users});
			} catch (err) {
				WebSuite.getLogger().error(err.message);
			}
		});

		WebSuite.getWebSocketHandler().registerEvent("user-profile", async (socket, data) => {
			try {
				let userID = WebSuite.getSessions().getUserID(socket);

				let hasPermission = null;

				if(userID === undefined) {
					hasPermission = await WebSuite.getUserHandler().getGuestGroup().hasPermission("core.frontend.user.viewProfile");
				} else {
					hasPermission = await (await WebSuite.getUserHandler().getUserByUserID(userID)).hasPermission("core.frontend.user.viewProfile");
				}

				if(hasPermission === null)
					throw new Error("error checking permissions");

				if(hasPermission === false)
					throw new Error("permission denied");

				const basicInformation = await WebSuite.getDatabase().query("SELECT username, groupName FROM wsUser, wsGroupUser, wsGroup WHERE wsUser.userID = wsGroupUser.userID AND wsGroup.groupID = wsGroupUser.groupID AND wsUser.userID = ?;", [data.userID]);

				WebSuite.getWebSocketHandler().sendToClient(socket, "user-profile", {basicInformation: basicInformation[0]});
			} catch (err) {
				WebSuite.getLogger().error(err.message);
			}
		});
	}

}

module.exports = User;