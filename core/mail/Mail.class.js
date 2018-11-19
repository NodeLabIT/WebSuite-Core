"use strict";

const nodemailer = require("nodemailer");

const config = require(_config);

/**
 * Manages the mailserver-connection and delivers an endpoint for sending mails
 *
 * @hideconstructor
 * */
class Mail {

	constructor(callback) {
		this._connect((connected) => {
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
	 * Callback as function to handle the success of creating the mailserver-connection
	 *
	 * @callback Mail~mailConnectHandler
	 *
	 * @param {boolean} success when connect was successful true, otherwise false
	 *
	 * @private
	 * */

	/**
	 * Connect to the mailserver
	 *
	 * @param {Mail~mailConnectHandler} success Callback to handle the success/failure (boolean true when successful, otherwise false)
	 *
	 * @private
	 * */
	_connect(success) {
		FileUtil.readFile(_config).then((content) => {
			content = JSON.parse(content);
			this._transport = nodemailer.createTransport({
				host: content.mail.host,
				port: content.mail.port,
				opportunisticTLS: true,
				connectionTimeout: 2500,
				auth: {
					user: content.mail.sender.user,
					pass: content.mail.sender.password
				}
			});

			this._transport.verify((err) => {
				if(err) {
					WebSuite.getLogger().error(`An error occurred while trying to connect to mail-server:\n${err.message}`);
					success(false);
					return;
				}
				success(true);
			});
		}).catch((err) => {
			WebSuite.getLogger().error(`An error occurred while trying to connect to mail-server:\n${err.message}`);
			success(false);
		});
	}

	/**
	 * Callback as function to handle the success of closing the mailserver-connection
	 *
	 * @callback Mail~mailDisconnectHandler
	 *
	 * @param {boolean} success when disconnect was successful true, otherwise false
	 *
	 * @private
	 * */

	/**
	 * Disconnect from the mailserver
	 *
	 * @param {Mail~mailDisconnectHandler} success Callback to handle the success/failure (boolean true when successful, otherwise false)
	 *
	 * @private
	 * */
	_disconnect(success) {
		// Disconnect from mail-server
		this._transport.close();
		success();
	}

	/**
	 * Callback as function to handle the success of the recreating the mailserver-connection (reconnect)
	 *
	 * @callback Mail~mailReconnectHandler
	 *
	 * @param {boolean} success when reconenct was successful true, otherwise false
	 *
	 * @private
	 * */

	/**
	 * Reconnect to the mailserver
	 *
	 * @param {Mail~mailReconnectHandler} success Callback to handle the success/failure (boolean true when successful, otherwise false)
	 *
	 * @private
	 * */
	_reconnect(success) {
		// disconnect
		this._disconnect(() => {
			// connect
			this._connect((connected) => {
				if(!connected) {
					success(false);
					return;
				}
				success(true);
			});
		});
	}

	// TODO: JS-Docs, add error-handling using Promises
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