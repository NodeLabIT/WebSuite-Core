"use strict";

const express = require("express");
const serveStatic = require("serve-static");
const compression = require("compression");
const fs = require("fs");
const http = require("http");

const config = require(_config);
const frontendIndex = require("./FrontendIndexPage.class");

const puppeteer = require("puppeteer");
const crawlerUserAgents = require("../../crawler-user-agents.json");
const url = `http://localhost:${config.server.webserver}`;
const webpage = /\/(.*?)\./i;

/**
 * Class for creating and managing the webserver
 *
 * @private
 * @hideconstructor
 * */
class WebServer {

	constructor() {
		this.init();
	}

	async init() {
		this.listening = false;
		this.app = express();

		// Add compression to express-app
		this.app.use(compression());
		this.app.use((req, res, next) => {
			res.setHeader("x-powered-by", "NodeLab Web/1.0.0 (WebSuite Core)");
			next();
		});

		let crawlers = [];
		await crawlerUserAgents.forEach(c => c.instances.forEach(i => crawlers.push(i)));

		// Start Chromium on launch
		const browser = await puppeteer.launch({args: ["--no-sandbox"], executablePath: "/usr/bin/chromium-browser"});

		this.app.use(async (req, res, next) => {
			if(!req.headers || !req.headers["user-agent"]) {
				next();
				return;
			}

			if(!crawlers.some(e => req.headers["user-agent"].toString().includes(e))) {
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

			const page = await browser.newPage();
			await page.goto(pageUrl);
			await page.waitForFunction('document.rendered === true');

			res.send(await page.content());

			await page.close();
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
		this.app.use(serveStatic(`${_dir}/data/web/public/`));
		this.app.use((req, res) => {
			const indexPage = frontendIndex.getIndexPage();
			if(typeof indexPage !== "undefined") {
				res.send(indexPage);
			} else {
				frontendIndex.compileIndexPage();
				res.send("website not available. please try again");
			}
		});

		// initialize webserver and start it
		this.webServer = http.Server(this.app);
	}

	/**
	 * @private
	 * */
	uInt8ArrToString(myUint8Arr){
		return String.fromCharCode.apply(null, myUint8Arr);
	}

	/**
	 * Make the webserver listen on specified port
	 *
	 * @private
	 * */
	listen() {
		if(!this.listening) {
			frontendIndex.init();
			this.webServer.listen(config.server.webserver, () => {
				WebSuite.getLogger().info(`Webserver listening on port ${this.webServer.address().port}`);
			});
		}
	}
}

module.exports = new WebServer();