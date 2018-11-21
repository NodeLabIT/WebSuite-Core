"use strict";

const fs = require("fs");

const config = require(_config);
const plugins = require(_dir + "/data/plugins.json");
const packageFile = require("../package.json");

/**
 * Class for basic checks before the application starts
 * */
class Check {

	/**
	 * Checks for different settings, programs and dependencies
	 *
	 * @returns Promise resolves, when all check were successful, otherwise it rejects
	 * */
	constructor() {
		return new Promise((resolve, reject) => {
			// Check for required dependencies
			for (let dependency in packageFile.dependencies) {
				if (!fs.existsSync(`${global._dir}/node_modules/${dependency}/`)) {
					reject("missing dependencies. run 'npm install' to install them");
					return;
				}
			}
			for (let plugin of plugins) {
				let pluginPackage = require(`${global._dir}/plugins/${plugin}/package.json`);
				for (let dependency in pluginPackage.dependencies) {
					if (!fs.existsSync(`${global._dir}/node_modules/${dependency}/`)) {
						reject(`missing plugin-dependency '${dependency}'. run 'npm install ${dependency}' to install it`);
						return;
					}
				}
			}

			// Check for config-conflicts
			if (config.workers <= 0) {
				reject("amount of workers less than 1");
				return;
			}
			if (config.server.socketio === config.server.webserver) {
				reject("socket.io can't listen on the same port as the webserver");
				return;
			}

			// resolve when all checks passed
			resolve();
		});
	}

}

module.exports = Check;