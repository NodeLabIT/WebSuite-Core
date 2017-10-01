'use strict';

const fs = require('fs');

const config = require('../config.json');
const packageFile = require('../package.json');

/**
 * Used for basic checks before the application starts
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
            for(let dependency in packageFile.dependencies) {
                // TODO: Add check for plugin-dependencies
                if(!fs.existsSync(__dirname + "/../node_modules/" + dependency + "/")) {
                    reject('missing dependencies. run \'npm install\' to install them'); return;
                }
            }

            // Check for Node-Version higher 4
            if(process.versions.node.split(".")[0] < 4) {
                reject('node-version not sufficient to run this system'); return;
            }

            // Check for config-conflicts
            if(config.workers <= 0) {
                reject('amount of workers less than 0'); return;
            }
            if(config.server.socketio === config.server.webserver) {
                reject('socket.io can\'t listen on the same port as the webserver'); return;
            }
            resolve();
        });
    }

}

module.exports = Check;