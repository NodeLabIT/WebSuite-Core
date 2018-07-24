"use strict";

const EventEmitter = require("../event/EventEmitter.class");

class SessionsRequestHandler {

	constructor() {
		this._requestEvents = new EventEmitter();

		process.on("message", (message) => [

		]);
	}

	user(userID) {

	}

	session(sessionID) {

	}

}

module.exports = new SessionsRequestHandler();