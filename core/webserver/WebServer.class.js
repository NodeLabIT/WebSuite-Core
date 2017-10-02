'use strict';

const express = require('express');
const serveStatic = require('serve-static');
const compression = require('compression');
const fs = require('fs');
const http = require('http');

const config = require('../../config.json');

/**
 * Class for creating and managing the webserver
 * */
class WebServer {

    constructor() {
        this.listening = false;
        this.app = express();

        // Add compression to express-app
        this.app.use(compression());
        this.app.use((req, res, next) => {
            res.setHeader('x-powered-by', 'NodeLab Web/1.0.0 (WebSuite Core)');
            next();
        });

        // serve socket.io-File
        this.app.get('/socket.io.js', (req, res) => {
            res.send(fs.readFileSync(__dirname + "/../../node_modules/socket.io-client/dist/socket.io.js"));
        });

        // add cp-directive
        this.app.use('/cp/', serveStatic(__dirname + '/../../cp/'));
        this.app.use("/cp/", (req, res) => {
            res.send(fs.readFileSync(__dirname + '/../../cp/index.html', {encoding: 'utf-8'}));
        });

        // add public-directive
        this.app.use(serveStatic(__dirname + '/../../public/'));
        this.app.use((req, res) => {
            res.send(fs.readFileSync(__dirname + '/../../public/index.html', {encoding: 'utf-8'}));
        });

        // initialize webserver and start it
        this.webServer = http.Server(this.app);
    }

    /**
     * Make the webserver listen on specified port
     * */
    listen() {
        if(!this.listening) {
            this.webServer.listen(config.server.webserver, () => {
                WebSuite.getLogger().info(`Webserver listening on port ${this.webServer.address().port}`);
            });
        }
    }

}

module.exports = new WebServer();