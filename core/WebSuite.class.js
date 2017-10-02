'use strict';

const WebSocketHandler = require('./websocket/WebSocketHandler.class');
const Webserver  = require('./webserver/Webserver.class');

const Database = require('./database/Database.class');

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
     *
     * @private
     * */
    _getWebserver() {
        return Webserver;
    }

    /**
     * Get Database-Class to send database-queries
     *
     * @returns Database
     * */
    getDatabase() {
        return Database;
    }

}

module.exports = new WebSuite();