'use strict';

const cluster = require('cluster');
const os = require('os');

const config = require('./config.json');

const Check = require('./system/check.class');

if(cluster.isMaster) {
    const Logger = require('./core/logger/Logger.class');
    // TODO: Check for required settings and dependencies
    new Check().then(() => {
        // TODO: Check for undefined types to highly prevent crashes and uncaughtError-shutdowns

        // Start a special amount of workers
        for(let i = 0; i < config.workers; i++) {
            cluster.fork();
        }

        // If crash then log it and restart one worker
        cluster.on('exit', (worker, code, signal) => {
            if(code !== 0) {
                Logger.error(`Worker ${worker.process.pid} died. Restarting...`, true);
                cluster.fork();
            }
        });

        //socket.io-Server
        const io = require('socket.io')();
        const ioWildcard = require('socketio-wildcard')();

        // Use ioWildcard to send every packet from Master to one Worker
        io.use(ioWildcard);

        io.on('connection', (socket) => {
            socket.on('*', (packet) => {
                randomWorker(worker => {
                    console.log(worker.id);
                    worker.send(JSON.stringify({type: 'sioPacket', clientID: socket.conn.id, packet: packet}));
                });
            });
        });

        cluster.on('message', (worker, message, handle) => {
            const json = JSON.parse(message);

            if(json.type && json.type === 'sioPacket') {
                if(json.clientID && json.packet && json.packet.packetName && json.packet.packetData) {
                    if(json.clientID === 'broadcast') {
                        io.emit(json.packet.packetName, json.packet.packetData);
                    } else {
                        io.to(json.clientID).emit(json.packet.packetName, json.packet.packetData);
                    }
                }
            }
            if(json.type && json.type === 'system') {
                if(json.action && json.action === 'soft-restart') {
                    delete require.cache[require.resolve("./system/system.class")];

                    let i = 0;
                    const workers = Object.keys(cluster.workers);
                    const f = () => {
                        if(i === workers.length)
                            return;

                        cluster.workers[workers[i]].disconnect();

                        const worker = cluster.fork();
                        worker.on('listening', () => {
                            console.log("Restart (" + i + ") complete. Restarting next worker...");
                            i++;
                            f();
                        });
                    };
                    f();
                }
            }
        });

        io.listen(config.server.socketio);
    }, (err) => {
        Logger.error(err, true);
    });

}

if(cluster.isWorker) {
    require('./system/system.class');
}

/**
 * Go through all workers
 * @param callback returns one worker
 * */
function eachWorker(callback) {
    for(const id in cluster.workers) {
        callback(cluster.workers[id]);
    }
}

/**
 * Get random worker
 * @param callback returns one worker
 * */
function randomWorker(callback) {
    const workers = Object.keys(cluster.workers);
    callback(cluster.workers[workers[Math.ceil(Math.random() * workers.length) - 1]]);
}
