'use strict';

global.WebSuite = require('../core/WebSuite.class');

/**
 * Class to load the whole system
 * */
class SystemLoader {

    /*
     * first, loads the core,
     * then the plugins,
     * at least releases the connections for the webserver
     * */
    constructor() {
        // TODO: TEST
        WebSuite.getLogger().info(`Starting worker ${process.pid}`);
        WebSuite.getWebSocketHandler().registerCpEvent('cp-test', (clientID, data) => {
            WebSuite.getLogger().debug(clientID);
            WebSuite.getLogger().debug(data);
        });
        WebSuite._getWebServer().listen();
    }

}

module.exports = new SystemLoader();