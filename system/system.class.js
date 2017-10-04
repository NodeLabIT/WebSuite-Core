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
        global.WebSuite = new WebSuite(websuiteLoaded => {
            if(!websuiteLoaded) {
                return;
            }

            global.WebSuite._getWebServer().listen();
        });
    }

}

module.exports = new SystemLoader();