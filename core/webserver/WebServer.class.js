"use strict";

const express = require("express");
const serveStatic = require("serve-static");
const compression = require("compression");
const fs = require("fs");
const http = require("http");
const { spawn } = require("child_process");

const config = require(`${_dir}/config.json`);
const frontendIndex = require("./FrontendIndexPage.class");

const bots = config.crawler;
const url = `http://localhost:${config.server.webserver}`;
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
            res.setHeader("x-powered-by", "NodeLab Web/1.0.0 (WebSuite Core)");
            next();
        });

        this.app.use((req, res, next) => {
            if(!req.headers || !req.headers["user-agent"]) {
                next();
                return;
            }

            if(!bots.some(e => req.headers["user-agent"].toString().includes(e))) {
                next();
                return;
            }

            let isWebpage = webpage.exec(req.path) === null || req.path === "/";

            if(!isWebpage) {
                next();
                return;
            }

            if(req.path.startsWith("/cp")) {
                res.status(403).end("access denied for bots!");
                return;
            }

            let pageUrl = url + req.path;
            let cmd = spawn('phantomjs', ["prerender.js", pageUrl], {cwd: `${__dirname}/prerender/`});

            let output = "";
            cmd.stdout.on("data", (data) => {
                output = data;
            });
            cmd.stderr.on("data", (data) => {
                WebSuite.getLogger().error(`Error while rendering: ${this.Uint8ArrToString(data)}`);
            });
            cmd.on("close", (code) => {
                res.send(output.toString());
            });
        });

        // serve socket.io-File
        this.app.get("/socket.io.js", (req, res) => {
            res.header("Content-Type", "application/javascript");
            res.send(fs.readFileSync(`${_dir}/node_modules/socket.io-client/dist/socket.io.js`));
        });

        // add cp-directive
        this.app.use("/cp/", serveStatic(`${_dir}/cp/`));
        this.app.use("/cp/", (req, res) => {
            res.send(fs.readFileSync(`${_dir}/cp/index.html`, {encoding: "utf-8"}));
        });

        // add public-directive
        this.app.use(serveStatic(`${_dir}/frontend/`));
        this.app.use((req, res) => {
            const indexPage = frontendIndex.getIndexPage();
            if(indexPage !== undefined) {
                res.send(indexPage);
            } else {
                frontendIndex.compileIndexPage();
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
            frontendIndex.postInit();
            this.webServer.listen(config.server.webserver, () => {
                WebSuite.getLogger().info(`Webserver listening on port ${this.webServer.address().port}`);
            });
        }
    }
}

module.exports = new WebServer();