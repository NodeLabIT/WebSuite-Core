'use strict';

const nodemailer = require('nodemailer');

const config = require('../../config.json');

class Mail {

    constructor() {
        this._connect(connected => {
            if(connected) {
                WebSuite.getLogger().info("Connected to Mail-Server successfully");
                return;
            }

            WebSuite.getLogger().warn("Connection to Mail-Server can not be established!");
        });
    }

    /**
     * Connect to the Mail-Server
     *
     * @param success callback to handle the success (true when successful, otherwise false)
     *
     * @private
     * */
    _connect(success) {
        // TODO: Read file to get "new" values after configuration-changes (File-Utils)
        this._transport = nodemailer.createTransport({
            host: config.mail.host,
            port: config.mail.port,
            opportunisticTLS: true,
            connectionTimeout: 2500,
            auth: {
                user: config.mail.auth.user,
                pass: config.mail.auth.password
            }
        });

        this._transport.verify(err => {
            if(err) {
                WebSuite.getLogger().error(`An error occurred while trying to connect to database:\n${err.message}`);
                success(false);
                return;
            }
            success(true);
        });
    }

    /**
     * Disconnect from the Mail-Server
     *
     * @param success callback to handle the success (true when successful, otherwise false)
     *
     * @private
     * */
    _disconnect(success) {
        // Disconnect from mail-server
        this._transport.close();
        success();
    }

    /**
     * Disconnect from the Mail-Server and Connect again
     *
     * @param success callback to handle the success (true when successful, otherwise false)
     *
     * @private
     * */
    _reconnect(success) {
        // disconnect
        this._disconnect(() => {
            // connect
            this._connect(connected => {
                if(!connected) {
                    success(false);
                    return;
                }
                success(true);
            })
        })
    }

}

module.exports = new Mail();