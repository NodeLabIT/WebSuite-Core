"use strict";

const SessionsHandler = require("./SessionsHandler.class");

/**
 * Endpoint for session-based interaction
 *
 * @hideconstructor
 * */
class Sessions {

	/**
	 * Get userID of an user by its sessionID
	 *
	 * @param {String} sessionID user's sessionID you want to get the userID from
	 *
	 * @returns {Number} when userID found for sessionID, returns the userID of the user, otherwise -1
	 * */
	getUserID(sessionID) {
		return SessionsHandler.getUserID(sessionID);
	}

	/**
	 * Get a list of all current sessions of an user by its userID
	 *
	 * @param {Number} userID user's userID you want to get the session-list from
	 *
	 * @returns {(Array)} when sessionIDs found for userId, returns the the list of sessionIDs, otherwise an empty Array
	 * */
	getUserSessions(userID) {
		return SessionsHandler.getSessions(userID);
	}

}

module.exports = new Sessions();