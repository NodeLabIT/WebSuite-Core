'use strict';

const cluster = require('cluster');
const os = require('os');

const config = require('./config.json');

if(cluster.isMaster) {
    if(config.worker <= 0) {
        console.log(`WARNING | Number of workers cannot be less than 1 (${config.worker}). Setting it to ${os.cpus().length}`);
        config.worker = os.cpus().length;
    }

    for(let i = 0; i < config.worker; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });
}

if(cluster.isWorker) {
    console.log(`Starting worker ${process.pid}...`);
    require('./system/websuite.class');
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