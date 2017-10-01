'use strict';

const WebSocketHandler = require('./websocket/WebSocketHandler.class');

require('./webserver/Webserver.class');

/**
 * Core class of module 'core'
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

}

module.exports = new WebSuite();