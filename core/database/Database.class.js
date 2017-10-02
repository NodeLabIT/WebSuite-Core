'use strict';

const mysql = require('mysql');

const config = require('../../config.json');

class Database {

    constructor() {
        this._connect();
    }

    /**
     * Connect to the MySQL-Database
     *
     * @param success callback to handle the success (true when successful, otherwise false)
     *
     * @private
     * */
    _connect(success) {
        // TODO: Read file to read "new" values after configuration-changes (File-Utils)
        // create new connection-pool
        this._pool = mysql.createPool({
            connectionsLimit: config.database.connections,
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database
        });

        // Get connection to get information about successful connection-establishment
        this._pool.getConnection((err, connection) => {
            connection.release();
            if(!err) {
                success(false);
                return;
            }
            success(true);
        });
    }

    /**
     * Disconnect from the MySQL-Database
     *
     * @param success callback to handle the success (true when successful, otherwise false)
     *
     * @private
     * */
    _disconnect(success) {
        // Disconnect all connections from database
        this._pool.end((err) => {
            if(err) {
                success(false);
                return;
            }
            success(true);
        });
    }

    /**
     * Disconnect from the MySQL-Database and Connect again
     *
     * @param success callback to handle the success (true when successful, otherwise false)
     *
     * @private
     * */
    _reconnect(success) {
        // Try to disconnect
        this._disconnect(disconnected => {
            if(!disconnected) {
                success(false);
                return;
            }

            // Try to connect when disconnect was successful
            this._connect(connected => {
                if(!connected) {
                    success(false);
                    return;
                }
                success(true);
            });
        });
    }

    /**
     * Query Database
     *
     * @params query query you want to perform in the database
     * @params values Array of values to replace
     *
     * @returns Promise rejects on error, resolves on success
     * */
    query(query, values) {
        // TODO: Check whether more or less values than query-params are defined
        return new Promise((resolve, reject) => {

            // Get new connection from pool
            this._pool.getConnection((err, connection) => {
                if(!err) {
                    // release connection and reject on error
                    connection.release();
                    reject(err);
                    return;
                }

                // send query to connection
                connection.query(query, values, (error, results, fields) => {
                    // release connection back to the pool
                    connection.release();

                    // reject on error
                    if(error) {
                        reject(error);
                        return;
                    }

                    // resolve on success
                    resolve(results);
                });
            });
        });
    }

}

module.exports = new Database();