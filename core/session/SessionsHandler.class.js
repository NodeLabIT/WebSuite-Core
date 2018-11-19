"use strict";

class SessionsHandler {

	//TODO: Read from external caching-system

	constructor() {
		// userID: sessionID
		/*this._sessions = {};

		process.on("message", (message) => {
			if(message.type === "sessionsUpdate") {
				if(message.action === "add") {
					this._sessions[message.sessionID.toString()] = message.userID;
				} else if(message.action === "remove") {
					delete this._sessions[message.sessionID];
				}
			}
		});*/
	}

	getSessions(userID) {
		//return Object.keys(this._sessions).filter(e => this._sessions[e] === userID);
	}

	getUserID(sessionID) {
		//return this._sessions[sessionID];
	}

}

module.exports = new SessionsHandler();