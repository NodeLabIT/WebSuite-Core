"use strict";

const cron = require("node-cron");

/**
 * Verwaltung von Cronjobs, die während der Laufzeit der WebSuite ausgeführt werden
 *
 * @hideconstructor
 * */
class Cronjob {

	/**
	 * Callback as function to execute every time the cronjob runs.
	 *
	 * @callback Cronjob~cronjobHandler
	 * */

	/**
	 * Define a callback that is executed every time the cronjob runs. The time at which the cronjob is executed has to be
	 * determined.
	 *
	 * @param {string} time The time/period, as cron-syntax, at which the cronjob should run.
	 * @param {Cronjob~cronjobHandler} handle The callback that is executed every time the cronjob runs.
	 * */
	registerJob(time, handle) {
		if(typeof time === "undefined" || typeof handle === "undefined") {
			WebSuite.getLogger().warn("undefined Parameters registering new Cronjob!");
			return;
		}

		if(!cron.validate(time)) {
			WebSuite.getLogger().warn("given time is not a valid cron expression!");
			return;
		}

		cron.schedule(time, handle, true);
	}

}

module.exports = new Cronjob();