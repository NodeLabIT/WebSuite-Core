"use strict";

const EventEmitter = require("./EventEmitter.class");

class EventHandler {

	constructor() {
		this._eventHandler = new EventEmitter();
	}

	/**
	 * Listen to event
	 *
	 * @param eventName String eventname
	 * @param listener Function function to listen
	 * */
	on(eventName, listener) {
		this._eventHandler.on(eventName, listener);
	}

	/**
	 * Emit event
	 *
	 * @param eventName String eventname
	 * @param data {Object, Array} Object or Array containing information
	 * */
	emit(eventName, data) {
		this._eventHandler.emit(eventName, data);
	}

}

module.exports = new EventHandler();