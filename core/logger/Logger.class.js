"use strict";

const LogFile = require("./LogFile.class");

/**
 * Adds helper-functions to easily send information, errors, warnings or debug to the console. Information, errors and
 * warnings will also being saved to LogFiles.
 *
 * @hideconstructor
 * */
class Logger {

	// TODO: Check for set parameters in info(), debug(), warn() and error()

	/**
	 * Appends the message defined by parameter to the end of the log-file
	 *
	 * @param {String} message the message you want to append to the log-file
	 *
	 * @private
	 * */
	_logToFile(message) {
		LogFile.append(TimeUtil.timeString() + " | " + message + " (" + process.pid + ")");
	}

	/**
	 * send an info-message to the console (green color) and append it to the log-file
	 *
	 * @param {String} message message to send
	 * @param {boolean} master true when sending from master, otherwise false (or undefined)
	 * */
	info(message, master) {
		this._logToFile("INFO : " + message);
		if(master) {
			console.log(`\x1b[32m[MASTER | ${process.pid}] \x1b[0m${message}`);
			return;
		}
		console.log(`\x1b[32m[WORKER | ${process.pid}] \x1b[0m${message}`);
	}

	/**
	 * send a debug-message to the console (cyan color) and append it to the log-file
	 *
	 * @param {String} message message to send
	 * @param {boolean} master true when sending from master, otherwise false (or undefined)
	 * */
	debug(message, master) {
		if(master) {
			console.log(`\x1b[36m[MASTER | ${process.pid}] \x1b[0m${message}`);
			return;
		}
		console.log(`\x1b[36m[WORKER | ${process.pid}] \x1b[0m${message}`);
	}

	/**
	 * send an error-message to the console (red color) and append it to the log-file
	 *
	 * @param {String} message message to send
	 * @param {boolean} master true when sending from master, otherwise false (or undefined)
	 * */
	error(message, master) {
		this._logToFile("ERROR: " + message);
		if(master) {
			console.log(`\x1b[31m[MASTER | ${process.pid}] \x1b[0m${message}`);
			return;
		}
		console.log(`\x1b[31m[WORKER | ${process.pid}] \x1b[0m${message}`);
	}

	/**
	 * send a warn-message to the console (yellow color) and append it to the log-file
	 *
	 * @param {String} message message to send
	 * @param {boolean} master true when sending from master, otherwise false (or undefined)
	 * */
	warn(message, master) {
		this._logToFile("WARN : " + message);
		if(master) {
			console.log(`\x1b[33m[MASTER | ${process.pid}] \x1b[0m${message}`);
			return;
		}
		console.log(`\x1b[33m[WORKER | ${process.pid}] \x1b[0m${message}`);
	}

}

module.exports = new Logger();