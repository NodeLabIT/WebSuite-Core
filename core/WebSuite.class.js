'use strict';

const Logger = require('./logger/Logger.class');

const WebSocketHandler = require('./websocket/WebSocketHandler.class');
const WebServer  = require('./webserver/WebServer.class');

const Database = require('./database/Database.class');
const Mail = require('./mail/Mail.class');

/**
 * Class of core-module
 * */
class WebSuite {

    constructor() {

    }

    /**
     * Get WebSocketHandler to register new Socket-Events
     *
     * @returns WebSocketHandler-class
     * */
    getWebSocketHandler() {
        return WebSocketHandler;
    }

    /**
     * Get the web-server to let him listen, when system is started
     *
     * @returns WebServer-class
     *
     * @private
     * */
    _getWebServer() {
        return WebServer;
    }

    /**
     * Get the Logger to log information, errors, warnings and debug
     *
     * @returns Logger Logger-class
     * */
    getLogger() {
        return Logger;
    }

    /**
     * Get Database-Class to send database-queries
     *
     * @returns Database-class
     * */
    getDatabase() {
        return Database;
    }

    /**
     * Get Mail-Class to send emails
     *
     * @returns Mail-class
     * */
    getMail() {
        return Mail;
    }

}

module.exports = new WebSuite();