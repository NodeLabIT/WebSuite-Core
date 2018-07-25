"use strict";

const SessionsHandler = require("./SessionsHandler.class");

class Sessions {

	getUserID(sessionID) {
		return SessionsHandler.getUserID(sessionID);
	}

	getUserSessions(userID) {
		return SessionsHandler.getSessions(userID);
	}

}

module.exports = new Sessions();