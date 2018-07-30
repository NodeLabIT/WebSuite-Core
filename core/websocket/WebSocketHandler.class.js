"use strict";

// Create EventEmitter to proxy packets through the system
const EventEmitter = require("../event/EventEmitter.class");

/**
 * Class to work with packets in socket.io
 * @hideconstructor
 * */
class WebSocketHandler {

	constructor() {
		// Register Event-Emitter for CP-Events and Frontend-Events
		this._cpSocketEvents = new EventEmitter();
		this._socketEvents = new EventEmitter();

		// Listen for new messages from the master
		process.on("message", (message) => {
			// Parse Message to JSON-Object
			//message = JSON.parse(message);

			// Check, if type of sent message from master is 'sioPacket'
			if(message.type === "sioPacket") {
				if(message && message.packet && message.packet.data && message.packet.data[0] && message.clientID) {
					// Check, if packet-name starts with 'cp-'
					if(message.packet.data[0].startsWith("cp-")) {
						if(message.packet.data[1]) {
							this._cpSocketEvents.emit(message.packet.data[0], message.clientID, message.packet.data[1], message.address);
						} else {
							// TODO: Error on undefined data
						}
					} else {
						if(message.packet.data[1]) {
							this._socketEvents.emit(message.packet.data[0], message.clientID, message.packet.data[1], message.address);
						} else {
							// TODO: Error on undefined data
						}
					}
				} else {
					if(message && message.packet === "disconnect") {
						this._socketEvents.emit(message.packet, message.clientID, null, message.address);
					}
					// TODO: Error on undefined data
				}
			}
		});
	}

	/**
	 * Send packet to a user's client defined by clientID. packets' name is defined by packetName and packet's content is defined by packetData.
	 *
	 * @param {string} clientID User's clientID to define the packet-receiver
	 * @param {string} packetName The name that defines the packet being sent to the user's client
	 * @param {(object|array)} packetData Packet's content data
	 * */
	sendToClient(clientID, packetName, packetData) {
		if(clientID && packetName && packetData) {
			process.send({type: "sioPacket", clientID, packet: {packetName, packetData}});
		}
	}

	/**
	 * Callback as function to handle incoming cp-packets
	 *
	 * @callback WebSocketHandler~cpEventHandler
	 *
	 * @param {string} clientID the socket.io-sessionID of the client that sent this packet
	 * @param {(object|array)} data data sent by the user's client
	 * */

	/**
	 * Register a handler for a socket.io-packet sent from the control panel
	 *
	 * @param {string} packetName name of the packet
	 * @param {WebSocketHandler~cpEventHandler} handler Handler for the packet
	 * */
	registerCpEvent(packetName, handler) {
		if(packetName && handler) {
			this._cpSocketEvents.on(packetName, handler);
		}
	}
	/**
	 * Callback as function to handle incoming packets
	 *
	 * @callback WebSocketHandler~eventHandler
	 *
	 * @param {string} clientID the socket.io-sessionID of the client that sent this packet
	 * @param {(object|array)} data data sent by the user's client
	 * */

	/**
	 * Register a handler for a socket.io-packet sent from the frontend-page
	 *
	 * @param {string} packetName name of the packet
	 * @param {WebSocketHandler~eventHandler} handler Handler for the packet
	 * */
	registerEvent(packetName, handler) {
		if(packetName && handler) {
			this._socketEvents.on(packetName, handler);
		}
	}
}

module.exports = new WebSocketHandler();