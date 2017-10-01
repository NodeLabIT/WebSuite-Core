'use strict';

const WebSocketHandler = require('./websocket/WebSocketHandler.class');
const Webserver  = require('./webserver/Webserver.class');

/**
 * Class of core-module
 * */
class WebSuite {

    constructor() {

    }

    /**
     * Get WebSocketHandler to register new Socket-Events
     *
     * @returns WebSocketHandler
     * */
    getWebSocketHandler() {
        return WebSocketHandler;
    }

    /**
     * Get the Webserver to let him listen, when system is started
     *
     * @returns Webserver
     * @private
     * */
    _getWebserver() {
        return Webserver;
    }

}

module.exports = new WebSuite();