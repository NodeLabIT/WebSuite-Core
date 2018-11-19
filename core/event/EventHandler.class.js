"use strict";

const EventEmitter = require("./EventEmitter.class");

/**
 * Delivers an endpoint to listen on and emit events to the WebSuite's event-system
 *
 * @hideconstructor
 * */
class EventHandler {

	constructor() {
		this._eventHandler = new EventEmitter();
	}

	/**
	 * Callback as function to handle the received packet
	 *
	 * @callback EventHandler~onEvent
	 *
	 * @param {(Object|Array)} [data] Object/Array containing the data that were attached to the event
	 *
	 * @private
	 * */

	/**
	 * Define a callback that is executed when an event with the given event-name is fired.
	 *
	 * @param {String} eventName The name of the event you want to listen on.
	 * @param {EventEmitter~onEvent} listener The callback that is executed when the event is fired.
	 * */
	on(eventName, listener) {
		this._eventHandler.on(eventName, listener);
	}

	/**
	 * Fire an event to the WebSuite's event-system by defining an event-name and attaching (optional) data to the event
	 *
	 * @param {String} eventName The name of the event you want to fire.
	 * @param {(Object|Array)} data Optional Object/Array containing data that may be important to listeners.
	 * */
	emit(eventName, data = []) {
		this._eventHandler.emit(eventName, data);
	}

}

module.exports = new EventHandler();