"use strict";

/* eslint-disable no-console */

const LogFile = require("./LogFile.class");

class Logger {

	logToFile(message) {
		LogFile.append(TimeUtil.timeString() + " | " + message + " (" + process.pid + ")");
	}

	/**
	 * send info-message (green console-color)
	 *
	 * @param message message to send
	 * @param master boolean whether sending from master or not (undefined when worker)
	 * */
	info(message, master) {
		this.logToFile("INFO : " + message);
		if(master) {
			console.log(`\x1b[32m[MASTER | ${process.pid}] \x1b[0m${message}`);
			return;
		}
		console.log(`\x1b[32m[WORKER | ${process.pid}] \x1b[0m${message}`);
	}

	/**
	 * send debug-message (cyan console-color)
	 *
	 * @param message message to send
	 * @param master boolean whether sending from master or not (undefined when worker)
	 * */
	debug(message, master) {
		if(master) {
			console.log(`\x1b[36m[MASTER | ${process.pid}] \x1b[0m${message}`);
			return;
		}
		console.log(`\x1b[36m[WORKER | ${process.pid}] \x1b[0m${message}`);
	}

	/**
	 * send error-message (red console-color)
	 *
	 * @param message message to send
	 * @param master boolean whether sending from master or not (undefined when worker)
	 * */
	error(message, master) {
		this.logToFile("ERROR: " + message);
		if(master) {
			console.log(`\x1b[31m[MASTER | ${process.pid}] \x1b[0m${message}`);
			return;
		}
		console.log(`\x1b[31m[WORKER | ${process.pid}] \x1b[0m${message}`);
	}

	/**
	 * send warn-message (yellow console-color)
	 *
	 * @param message message to send
	 * @param master boolean whether sending from master or not (undefined when worker)
	 * */
	warn(message, master) {
		this.logToFile("WARN : " + message);
		if(master) {
			console.log(`\x1b[33m[MASTER | ${process.pid}] \x1b[0m${message}`);
			return;
		}
		console.log(`\x1b[33m[WORKER | ${process.pid}] \x1b[0m${message}`);
	}

}

module.exports = new Logger();