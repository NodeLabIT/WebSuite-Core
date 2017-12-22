'use strict';

const express = require('express');
const handlebar = require('handlebars');
const serveStatic = require('serve-static');
const compression = require('compression');
const fs = require('fs');
const http = require('http');
const { spawn } = require('child_process');

const config = require(_dir + '/config.json');

const bots = config.crawler;
const url = "http://localhost:" + config.server.webserver;
const webpage = /\/(.*?)\./i;

/**
 * Class for creating and managing the webserver
 * */
class WebServer {

    constructor() {
        this.listening = false;
        this.app = express();

        handlebar.registerHelper('meta', function(items, options) {
            let out = "";

            for(let i=0, l=items.length; i<l; i++) {
                out = out + "<meta " + options.fn(items[i]) + ">\n";
            }

            return out;
        });
        handlebar.registerHelper('links', function(items, options) {
            let out = "";

            for(let i=0, l=items.length; i<l; i++) {
                out = out + "<link " + options.fn(items[i]) + ">\n";
            }

            return out;
        });
        handlebar.registerHelper('scripts', function(items, options) {
            let out = "";

            for(let i=0, l=items.length; i<l; i++) {
                out = out + "<script src=\"" + options.fn(items[i]) + "\"></script>\n";
            }

            return out;
        });

        // Add compression to express-app
        this.app.use(compression());
        this.app.use((req, res, next) => {
            res.setHeader('x-powered-by', 'NodeLab Web/1.0.0 (WebSuite Core)');
            next();
        });

        this.app.use((req, res, next) => {
            if(!req.headers || !req.headers['user-agent']) {
                next();
                return;
            }

            if(!bots.some(e => req.headers['user-agent'].toString().includes(e))) {
                next();
                return;
            }

            let isWebpage = webpage.exec(req.path) === null || req.path === "/";

            if(!isWebpage) {
                next();
                return;
            }

            if(req.path.startsWith('/cp')) {
                res.status(403).send("access denied for bots!");
                return;
            }

            let pageUrl = url + req.path;
            let cmd = spawn('phantomjs', ['prerender.js', pageUrl], {cwd: __dirname + "/prerender/"});

            let output = "";
            cmd.stdout.on('data', (data) => {
                output = data;
            });
            cmd.stderr.on('data', (data) => {
                WebSuite.getLogger().error(`Error while rendering: ${this.Uint8ArrToString(data)}`);
            });
            cmd.on('close', (code) => {
                res.send(output.toString());
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
            if(this.frontendTemplate) {
                res.send(this.frontendTemplate);
                //res.send(fs.readFileSync(_dir + '/frontend/index.html', {encoding: 'utf-8'}));
            } else {
                this.compileFrontendTemplate();
                res.send("website not available. please try again");
            }
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
            this.compileFrontendTemplate();
            this.webServer.listen(config.server.webserver, () => {
                WebSuite.getLogger().info(`Webserver listening on port ${this.webServer.address().port}`);
            });
        }
    }

    // TODO: prettify
    /**
     * @private
     * */
    compileFrontendTemplate() {
        FileUtil.readFile(__dirname + '/index.html').then(content => {
            let template = handlebar.compile(content);

            let data = {
                meta: [
                    {content: `charset="utf-8"`},
                    {content: `name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"`}
                ],
                title: "NodeLab IT",
                links: [
                    {content: `href="css/style.css" rel="stylesheet" type="text/css"`},
                    {content: `href="css/mobile.css" rel="stylesheet" type="text/css"`},
                    {content: `href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800" rel="stylesheet"`},
                    {content: `href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"`}
                ],
                scripts: [
                    {content: `javascript/jquery_3.2.1.js`},
                    {content: `/socket.io.js`},
                    {content: `javascript/main.js`},
                    {content: `dist/websuite.js`}
                ]
            };

            this.frontendTemplate = template(data);
        }).catch(err => {
            console.log(err.message);
        });
    }
}

module.exports = new WebServer();