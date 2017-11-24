'use strict';

const express = require('express');
const serveStatic = require('serve-static');
const compression = require('compression');
const fs = require('fs');
const http = require('http');
const { spawn } = require('child_process');

const config = require(_dir + '/config.json');

const bots = ["googlebot", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"];
const url = "http://localhost:8080";
const webpage = /\/(.*?)\./i;

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

        // TODO: Add prerender
        this.app.use((req, res, next) => {
            if(bots.indexOf(req.headers['user-agent']) === -1) {
                next();
                return;
            }

            let isWebpage = webpage.exec(req.path) === null || req.path === "/";

            if(!isWebpage) {
                next();
                return;
            }

            let pageUrl = url + req.path;
            let cmd = spawn('phantomjs', ['prerender.js', pageUrl], {cwd: __dirname + "/prerender/"});

            let output = "";
            cmd.stdout.on('data', (data) => {
                console.log(this.Uint8ArrToString(data));
                output = data;
            });
            cmd.stderr.on('data', (data) => {
                console.log(this.Uint8ArrToString(data));
                console.log(`Error: ${data}`);
            });
            cmd.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
                res.send(output.toString());
                console.log("Prerendering finished");
            });
        });

        // serve socket.io-File
        this.app.get('/socket.io.js', (req, res) => {
            res.header("Content-Type", "application/javascript");
            res.send(fs.readFileSync(_dir + '/node_modules/socket.io-client/dist/socket.io.js'));
        });

        // add cp-directive
        this.app.use('/cp/', serveStatic(_dir + '/cp/'));
        this.app.use("/cp/", (req, res) => {
            res.send(fs.readFileSync(_dir + '/cp/index.html', {encoding: 'utf-8'}));
        });

        // add public-directive
        this.app.use(serveStatic(_dir + '/frontend/'));
        this.app.use((req, res) => {
            res.send(fs.readFileSync(_dir + '/frontend/index.html', {encoding: 'utf-8'}));
        });

        // initialize webserver and start it
        this.webServer = http.Server(this.app);
    }

    Uint8ArrToString(myUint8Arr){
        return String.fromCharCode.apply(null, myUint8Arr);
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