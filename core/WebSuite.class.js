'use strict';

const Logger = require('./logger/Logger.class');

const WebSocketHandler = require('./websocket/WebSocketHandler.class');
const WebServer  = require('./webserver/WebServer.class');

const Database = require('./database/Database.class');
const Mail = require('./mail/Mail.class');

const UserHandler = require('./user/UserHandler.class');

/**
 * Class of core-module
 * */
class WebSuite {

    constructor(callback) {
        this.getLogger().info(`Starting worker ${process.pid}`);
        this._database = new Database(databaseConnected => {
            if(!databaseConnected) {
                callback(false);
                return;
            }

            this._mail = new Mail(mailConnected => {
                if(!mailConnected) {
                    callback(false);
                    return;
                }

                callback(true);

                // TODO: Remove test when tests ready
                this.getUserHandler().getUserByUserID(2).then(user => {
                    user.getUserInformation().then(test => {
                        console.log(test.username);
                    }).catch(err => {
                        if(err.message === 'no data found') {
                            console.log("User doesn't have profile-information");
                        }
                    });
                }).catch(err => {
                    if(err.message === 'no data found') {
                        console.log("User doesn't exist");
                    } else {

                    }
                });
            })
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

}

module.exports = WebSuite;