"use strict";

/* eslint-disable no-console */
global._dir = __dirname;
global._config = __dirname + "/data/config.json";

const cluster = require("cluster");

const config = require(_config);

const Check = require("./system/check.class");

// Utils
require("./core/utils/CryptoUtil.class");
require("./core/utils/FileUtil.class");
require("./core/utils/TimeUtil.class");
require("./core/utils/UserUtil.class");

if (cluster.isMaster) {
	new Check().then(() => {
		// TODO: Check for undefined types to highly prevent crashes and uncaughtError-shutdowns

		// Start a special amount of workers
		for (let i = 0; i < config.workers; i++) {
			cluster.fork();
		}

		let restarting = false;
		let unhandledPackets = [];

		// If crash then log it and restart one worker
		cluster.on("exit", (worker, code) => {
			if (code !== 0) {
				console.error(`Worker ${worker.process.pid} died. Restarting...`);
				cluster.fork();
			}
		});

		//socket.io-Server
		const io = require("socket.io")();
		const ioWildcard = require("socketio-wildcard")();

		// Use ioWildcard to send every packet from Master to one Worker
		io.use(ioWildcard);

		io.on("connection", (socket) => {
			socket.on("disconnect", () => {
				randomWorker((worker) => {
					worker.send({
						type: "sioPacket",
						clientID: socket.conn.id,
						packet: "disconnect",
						address: socket.handshake.address
					});
				});
			});
			socket.on("*", (packet) => {
				if (restarting) {
					unhandledPackets.push({
						type: "sioPacket",
						clientID: socket.conn.id,
						packet,
						address: socket.handshake.address
					});
				} else {
					randomWorker((worker) => {
						worker.send({
							type: "sioPacket",
							clientID: socket.conn.id,
							packet,
							address: socket.handshake.address
						});
					});
				}
			});
		});

		let handleUnhandledPackets = () => {
			if (unhandledPackets.length > 0) {
				unhandledPackets.forEach((packet) => {
					randomWorker((worker) => {
						worker.send(packet);
					});
				});
			}
		};

		cluster.on("message", (worker, message, handle) => {
			if (typeof message.type !== "undefined" && message.type === "sioPacket") {
				if (message.clientID && message.packet && message.packet.packetName && message.packet.packetData) {
					if (message.clientID === "broadcast") {
						io.emit(message.packet.packetName, message.packet.packetData);
					} else {
						io.to(message.clientID).emit(message.packet.packetName, message.packet.packetData);
					}
				}
			}

			if(typeof message.type !== "undefined" && message.type === "sioAdd") {
				if(typeof message.userID !== "undefined" && typeof message.sessionID !== "undefined") {
					eachWorker((worker) => {
						worker.send({
							type: "sessionsUpdate",
							action: "add",
							userID: message.userID,
							sessionID: message.sessionID
						});
					});
				}
			}

			if(typeof message.type !== "undefined" && message.type === "sioRemove") {
				if(typeof message.sessionID !== "undefined") {
					eachWorker((worker) => {
						worker.send({
							type: "sessionsUpdate",
							action: "remove",
							sessionID: message.sessionID
						});
					});
				}
			}

			if (typeof message.type !== "undefined" && message.type === "system") {
				if (message.action && message.action === "restart") {
					restarting = true;
					io.emit("restart", {});
					setTimeout(() => {
						delete require.cache[require.resolve("./system/system.class")];

						let i = 0;
						const workers = Object.keys(cluster.workers);
						const f = () => {
							if (i === workers.length) {
								io.emit("restart-finished", {});
								restarting = false;
								handleUnhandledPackets();
								return;
							}

							cluster.workers[workers[i]].disconnect();

							const worker = cluster.fork();
							worker.on("listening", () => {
								i++;
								f();
							});
						};
						f();
					}, 7000);
				}
			}
		});

		io.listen(config.server.socketio);
	}, (err) => {
		console.error(err, true);
	});

}

if (cluster.isWorker) {
	require("./system/system.class");
}

/**
 * Go through all workers
 * @param callback returns one worker
 *
 * @private
 * */
function eachWorker(callback) {
	for (const id in cluster.workers) {
		callback(cluster.workers[id]);
	}
}

/**
 * Get random worker
 * @param callback returns one worker
 *
 * @private
 * */
function randomWorker(callback) {
	const workers = Object.keys(cluster.workers);
	callback(cluster.workers[workers[Math.ceil(Math.random() * workers.length) - 1]]);
}
