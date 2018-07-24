"use strict";

const User = require("../user/User.class");

class Sessions {

	getUserID(sessionID) {
		return new Promise((resolve, reject) => {
			process.send(JSON.stringify(
				{
					type: "sioUserRequest",
					sessionID: sessionID
				}
			));

			process.on("message", (message) => {
				message = JSON.parse(message);

				if(message.type === "sioUserRequest") {
					if(message.sessionID === sessionID) {
						
					}
				}
			});
		});
	}

	getUserSessions(userID) {
		return new Promise((resolve, reject) => {
			process.send(JSON.stringify(
				{
					type: "sioSessionRequest",
					userID: userID
				}
			));

			process.on("message", (message) => {
				message = JSON.parse(message);

				if(message.type === "sioSessionRequest") {
					if(message.userID === userID) {

					}
				}
			});
		});
	}

}

module.exports = new Sessions();