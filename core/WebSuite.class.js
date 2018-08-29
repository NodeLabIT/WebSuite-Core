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

/**
 * Der Kern der gesamten Anwendung. Über diese Klasse erhalten Entwickler Zugriff auf alle für sie wichtigen Systeme,
 * bzw. Methoden zur Entwicklung der WebSuite, bzw. Erweiterungen dieser.
 *
 * NIEMALS den Konstruktor aufrufen!
 *
 * @hideconstructor
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

			this._mail = new Mail(async (mailConnected) => {
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
	 * Händler-Klasse um auf einkommende Pakete von der Webseite (Frontend als auch Control Panel) zu reagieren, als auch
	 * Pakete zu speziellen Nutzern oder allen verbundenen Nutzern zu senden.
	 *
	 * @return {WebSocketHandler}
	 * */
	getWebSocketHandler() {
		return WebSocketHandler;
	}

	/**
	 * Händler-Klasse um auf Events innerhalb des Systems zu reagieren, als auch um Events innerhalb des Systems zu senden.
	 *
	 * @returns {EventHandler}
	 * */
	getEventHandler() {
		return EventHandler;
	}

	/**
	 * Händler-Klasse zur Verwaltung von Cronjobs, die während der Laufzeit des System ausgeführt werden.
	 *
	 * @returns {Cronjob}
	 * */
	getCrons() {
		return Cronjob;
	}

	/**
	 * @returns {WebServer}
	 *
	 * @private
	 * */
	_getWebServer() {
		return WebServer;
	}

	/**
	 * Händler-Klasse um Informationen, Fehler, Warnungen oder Debug in der Konsole zu senden als auch in den Logdateien
	 * zu speichern.
	 *
	 * @returns {Logger}
	 * */
	getLogger() {
		return Logger;
	}

	/**
	 * Händler-Klasse um den Zugriff auf die Datenbank zu gewähren und Methoden zu bieten, mit denen Daten ausgelesen,
	 * geändert, hinzugefügt oder auch gelöscht werden können.
	 *
	 * @returns {Database}
	 * */
	getDatabase() {
		return this._database;
	}

	/**
	 * Händler-Klasse um E-Mails zu versenden.
	 *
	 * @returns {Mail}
	 * */
	getMail() {
		return this._mail;
	}

	/**
	 * Händler-Klasse um Nutzer anhand ihrer NutzerID, ihres Nutzernamen oder ihrer E-Mail-Adresse anzufragen.
	 *
	 * @returns {UserHandler}
	 * */
	getUserHandler() {
		return UserHandler;
	}

	/**
	 * Händler-Klasse um die Sessions der aktuell mit dem System verbundenen Nutzer abzufragen.
	 *
	 * @returns {Sessions}
	 * */
	getSessions() {
		return Sessions;
	}

}

module.exports = WebSuite;