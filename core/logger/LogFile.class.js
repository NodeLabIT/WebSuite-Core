'use strict';

class LogFile {

    constructor() {
        this._queue = [];

        this._running = false;
    }

    enqueue(data) {
        this._queue.push(data);
        if(!this._running)
            this.dequeue();
    }

    dequeue() {
        this._running = true;
        DirectoryUtil.directoryExists(__dirname + '/../../logs/').then(() => {
            const date = new Date();
            const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

            let message = this._queue.shift();
            console.log(message);

            // TODO: Improve dequeue

            FileUtil.fileExists(`${__dirname}/../../logs/${dateString}.txt`).then(() => {
                FileUtil.readFile(`${__dirname}/../../logs/${dateString}.txt`).then(content => {
                    content += message + "\n";
                    FileUtil.saveFile(`${__dirname}/../../logs/${dateString}.txt`, content).then(() => {
                        this._running = false;
                        if(this._queue.length > 0)
                            this.dequeue();
                    }).catch(err => {
                        this._running = false;
                        if(this._queue.length > 0)
                            this.dequeue();
                        // TODO: Handle error
                    });
                }).catch(err => {
                    this._running = false;
                    if(this._queue.length > 0)
                        this.dequeue();
                    // TODO: Handle error
                });
            }).catch(err => {
                FileUtil.saveFile(`${__dirname}/../../logs/${dateString}.txt`, message + "\n").then(() => {
                    this._running = false;
                    if(this._queue.length > 0)
                        this.dequeue();
                }).catch(err2 => {
                    // TODO: Handle error
                    this._running = false;
                    if(this._queue.length > 0)
                        this.dequeue();
                });
            });
        }).catch(err => {
            if(err.code === 'ENOENT') {
                DirectoryUtil.createDirectory(__dirname + '/../../', 'logs').then(() => {
                    this.dequeue();
                    this._running = false;
                }).catch(err => {
                    // TODO: Handle error
                    this._running = false;
                });
            }
        });
    }

}

module.exports = new LogFile();