'use strict';

const WebSuite = require('../core/WebSuite.class');

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
        WebSuite.getWebSocketHandler().registerCpEvent('cp-test', (clientID, data) => {
            console.log(clientID);
            console.log(data);
        });
        WebSuite._getWebserver().listen();
    }

}

module.exports = new SystemLoader();