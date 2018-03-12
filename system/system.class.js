"use strict";

const WebSuite = require("../core/WebSuite.class");

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

            require("../core/websocket/eventListener/cp/user.userlist.class").listen();
            require("../core/websocket/eventListener/cp/user.grouplist.class").listen();
            require("../core/websocket/eventListener/cp/user.groupadd.class").listen();
            require("../core/websocket/eventListener/cp/user.groupedit.class").listen();
            require("../core/websocket/eventListener/cp/dashboard.class").listen();
            require("../core/websocket/eventListener/cp/configuration.general.class").listen();
            require("../core/websocket/eventListener/cp/configuration.access.class").listen();

            require("../core/websocket/eventListener/default.class").listen();
            require("../core/websocket/eventListener/login.class").listen();
            require("../core/websocket/eventListener/register.class").listen();
            require("../core/websocket/eventListener/user.class").listen();

            global.WebSuite._getWebServer().listen();
        });
    }

}

module.exports = new SystemLoader();