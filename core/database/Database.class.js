"use strict";

const mysql = require("mysql");

class Database {

    constructor(callback) {
        this._connect(connected => {
            if(connected) {
                global.WebSuite.getLogger().info("Connected to MySQL-Database successfully");
                callback(true);
                return;
            }

            callback(false);
            global.WebSuite.getLogger().warn("Connection to MySQL-Database can not be established!");
        });
    }

    /**
     * Connect to the MySQL-Database
     *
     * @param success callback to handle the success (true when successful, otherwise false)
     *
     * @private
     * */
    _connect(success) {
        global.FileUtil.readFile(`${global._dir}/config.json`).then((content) => {
            content = JSON.parse(content);
            // create new sql-connection-pool
            this._pool = mysql.createPool({
                connectionsLimit: content.database.connections,
                host: content.database.host,
                user: content.database.user,
                password: content.database.password,
                database: content.database.database
            });

            // Get connection to get information about successful connection-establishment
            this._pool.getConnection((err, connection) => {
                if(typeof connection === "undefined") {
                    global.WebSuite.getLogger().error(`An error occurred while performing query '${query}':\nno database connection`);
                    success(false);
                    return;
                }
                if(err) {
                    global.WebSuite.getLogger().error(`An error occurred while trying to connect to database:\n${err.message}`);
                    success(false);
                    return;
                }
                connection.release();
                success(true);
            });
        }).catch((err) => {
            global.WebSuite.getLogger().error(`An error occurred while trying to connect to database:\n${err.message}`);
            success(false);
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
                global.WebSuite.getLogger().error(`An error occurred while trying to disconnect from Database: \n${err.message}`);
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
        this._disconnect((disconnected) => {
            if(!disconnected) {
                success(false);
                return;
            }

            // Try to connect when disconnect was successful
            this._connect((connected) => {
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
        return new Promise((resolve, reject) => {
            // Get new connection from pool
            this._pool.getConnection((err, connection) => {
                if(typeof connection === "undefined") {
                    reject(new Error("no database connection"));
                    global.WebSuite.getLogger().error(`An error occurred while performing query '${query}':\nno database connection`);
                    return;
                }
                if(err) {
                    // release connection and reject on error
                    connection.release();
                    reject(err);
                    global.WebSuite.getLogger().error(`An error occurred while performing query '${query}':\n${err.message}`);
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

module.exports = Database;
