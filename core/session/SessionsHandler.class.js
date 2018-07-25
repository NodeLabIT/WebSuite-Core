"use strict";

class SessionsHandler {

	constructor() {
		process.on("message", (message) => {
			if(message.type === "sessionsUpdate") {
				if(message.action === "add") {
					// TODO: Add to session-list
				} else if(message.action === "remove") {
					// TODO: Remove from session-list
				}
			}
		});
	}

}

module.exports = new SessionsHandler();