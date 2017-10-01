'use strict';

const cluster = require('cluster');
const os = require('os');

const config = require('./config.json');

if(cluster.isMaster) {
    // TODO: Check for undefined types to highly prevent crashes and uncaughtError-shutdowns
    // Check for worker-amount (need to be higher than 0)
    if(config.workers <= 0) {
        console.log(`WARNING | Number of workers cannot be less than 1 (${config.worker}). Setting it to ${os.cpus().length}`);
        config.workers = os.cpus().length;
    }

    // Start a special amount of workers
    for(let i = 0; i < config.workers; i++) {
        cluster.fork();
    }

    // If crash then log it and restart one worker
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });

    //socket.io-Server
    const io = require('socket.io')();
    const ioWildcard = require('socketio-wildcard')();

    // Use ioWildcard to send every packet from Master to one Worker
    io.use(ioWildcard);

    io.on('connection', (socket) => {
        socket.on('*', (packet) => {
            randomWorker(worker => {
                worker.send(JSON.stringify({type: 'sioPacket', clientID: socket.conn.id, packet: packet}));
            })
        });
    });

    cluster.on('message', (worker, message, handle) => {
        // TODO: Handle messages from Worker
        console.log(message);
    });

    io.listen(8080);
}

if(cluster.isWorker) {
    console.log(`Starting worker ${process.pid}...`);
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
    let workerIDs = [];
    for(const id in cluster.workers) {
        workerIDs.push(id);
    }
    callback(cluster.workers[Math.ceil(Math.random() * workerIDs.length)]);
}