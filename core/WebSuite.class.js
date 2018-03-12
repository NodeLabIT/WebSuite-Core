"use strict";

const Logger = require("./logger/Logger.class");

const WebSocketHandler = require("./websocket/WebSocketHandler.class");
const WebServer  = require("./webserver/WebServer.class");

const Database = require("./database/Database.class");
const Mail = require("./mail/Mail.class");

const UserHandler = require("./user/UserHandler.class");
const Sessions = require("./session/Sessions.class");

const EventHandler = require("./event/EventHandler.class");

const Cronjob = require("./cronjob/Cronjob.class");

// Utils
require("./utils/CryptoUtil.class");
require("./utils/DirectoryUtil.class");
require("./utils/FileUtil.class");
require("./utils/TimeUtil.class");
require("./utils/UserUtil.class");

/**
 * Class of core-module
 * */
class WebSuite {

    constructor(callback) {
        this.getLogger().info(`Starting worker ${process.pid}`);
        this._database = new Database((databaseConnected) => {
            if(!databaseConnected) {
                this.getLogger().info("Please check your database-setup! WebSuite cannot be started");
                callback(false);
                return;
            }

            this._mail = new Mail((mailConnected) => {
                if(!mailConnected) {
                    this.getLogger().info("Please check your mail-setup! WebSuite cannot be started");
                    callback(false);
                    return;
                }

                callback(true);
            });
        });
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
     * Get EventHandler to listen and emit system-events
     *
     * @returns EventHandler-class
     * */
    getEventHandler() {
        return EventHandler;
    }

    /**
     * Get CronjobHandler to register new cronjobs
     *
     * @returns Cronjob-class
     * */
    getCrons() {
        return Cronjob;
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
        return this._database;
    }

    /**
     * Get Mail-Class to send emails
     *
     * @returns Mail-class
     * */
    getMail() {
        return this._mail;
    }

    /**
     * Get User-Class to work with the User
     *
     * @returns UserHandler
     * */
    getUserHandler() {
        return UserHandler;
    }

    /**
     * Get Session-Class to work with User-Sessions
     *
     * @returns Sessions
     * */
    getSessions() {
        return Sessions;
    }

}

module.exports = WebSuite;