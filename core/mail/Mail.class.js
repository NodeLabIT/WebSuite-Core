"use strict";

const nodemailer = require("nodemailer");

const config = require("../../config.json");

class Mail {

    constructor(callback) {
        this._connect(connected => {
            if(connected) {
                WebSuite.getLogger().info("Connected to Mail-Server successfully");
                callback(true);
                return;
            }

            callback(false);
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
        FileUtil.readFile(`${_dir}/config.json`).then(content => {
            /*content = JSON.parse(content);
            this._transport = nodemailer.createTransport({
                host: content.mail.host,
                port: content.mail.port,
                opportunisticTLS: true,
                connectionTimeout: 2500,
                auth: {
                    user: content.mail.sender.user,
                    pass: content.mail.sender.password
                }
            });*/

            // DEVELOPMENT!
            this._transport = nodemailer.createTransport({
                host: "localhost",
                port: 1025,
                ignoreTLS: true
            });

            this._transport.verify(err => {
                if(err) {
                    WebSuite.getLogger().error(`An error occurred while trying to connect to mail-server:\n${err.message}`);
                    success(false);
                    return;
                }
                success(true);
            });
        }).catch(err => {
            WebSuite.getLogger().error(`An error occurred while trying to connect to mail-server:\n${err.message}`);
            success(false);
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
            });
        });
    }

    /**
     * Send HTML-Mail
     *
     * @param message message you want to send (can include HTML)
     * @param to recipient-address where the mail is supposed to be sent to
     * @param subject Subject of the email
     * */
    sendHTMLMail(message, to, subject) {
        let mailOptions = {
            from: `"${config.mail.sender.displayName}" <${config.mail.sender.user}>`,
            to,
            subject,
            html: `${message}`
        };

        this._transport.sendMail(mailOptions, (error, info) => {
            if(error) {
                // TODO: Handle error
                console.log(error);
            } else {
                // TODO: Handle success
                console.log(info);
            }
        });
    }


}

module.exports = Mail;