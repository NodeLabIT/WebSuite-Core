"use strict";

const EventEmitter = require("./EventEmitter.class");

class EventHandler {

	constructor() {
		this._eventHandler = new EventEmitter();
	}

	/**
	 * Define a callback that is executed when an event with the given event-name is fired.
	 *
	 * @param {String} eventName The name of the event you want to listen on.
	 * @param {Function} listener The callback that is executed when the event is fired.
	 *
	 * @return {undefined}
	 * */
	on(eventName, listener) {
		this._eventHandler.on(eventName, listener);
	}

	/**
	 * Fire an event to the WebSuite's event-system by defining an event-name and attaching (optional) data to the event
	 *
	 * @param {String} eventName The name of the event you want to fire.
	 * @param {(Object|Array)} data Optional Object/Array containing data that may be important to listeners.
	 *
	 * @return {undefined}
	 * */
	emit(eventName, data = []) {
		this._eventHandler.emit(eventName, data);
	}

}

module.exports = new EventHandler();