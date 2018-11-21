"use strict";

/**
 * @hideconstructor
 * */
class TimeUtil {

	/**
	 * Get the current time in milliseconds since 01.01.1970 00:00:00 UTC
	 *
	 * @returns {Number} current time in milliseconds
	 * */
	static currentTime() {
		return Date.now();
	}

	static dateString(date = new Date()) {
		return `${(date.getFullYear() < 10 ? "0" : "") + date.getFullYear()}-${((date.getMonth() + 1) < 10 ? "0" : "") + (date.getMonth() + 1)}-${(date.getDate() < 10 ? "0" : "") + date.getDate()}`;
	}

	static timeString(date = new Date()) {
		return (date.getHours() < 10 ? "0" : "") + date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes() + ":" + (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
	}

	/**
	 * Get a future time in milliseconds since 01.01.1970 00:00:00 UTC
	 *
	 * @param {Object} options Available options: days (number), hours (number), minutes (number), seconds (number)
	 *
	 * @returns {Number} future time in milliseconds
	 * */
	static futureTime(options) {
		if(options === null || typeof options === "function" || typeof options !== "object") {
			return -1;
		}

		let futureTime = this.currentTime();

		if(options.days && options.days > 0) {
			futureTime += options.days * 24 * 60 * 60 * 1000;
		}
		if(options.hours && options.hours > 0) {
			futureTime += options.hours * 60 * 60 * 1000;
		}
		if(options.minutes && options.minutes > 0) {
			futureTime += options.minutes * 60 * 1000;
		}
		if(options.seconds && options.seconds > 0) {
			futureTime += options.seconds * 1000;
		}

		return futureTime;
	}

	/**
	 * Get a future time in milliseconds since 01.01.1970 00:00:00 UTC
	 *
	 * @param {Object} options Available options: days (number), hours (number), minutes (number), seconds (number)
	 *
	 * @returns {Number} past time in milliseconds
	 * */
	static pastTime(options) {
		if(options === null || typeof options === "function" || typeof options !== "object") {
			return -1;
		}

		let pastTime = this.currentTime();

		if(options.days && options.days > 0) {
			pastTime -= options.days * 24 * 60 * 60 * 1000;
		}
		if(options.hours && options.hours > 0) {
			pastTime -= options.hours * 60 * 60 * 1000;
		}
		if(options.minutes && options.minutes > 0) {
			pastTime -= options.minutes * 60 * 1000;
		}
		if(options.seconds && options.seconds > 0) {
			pastTime -= options.seconds * 1000;
		}

		return pastTime;
	}

}

global.TimeUtil = TimeUtil;