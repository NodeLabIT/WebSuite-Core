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
        DirectoryUtil.directoryExists(_dir + '/logs/').then(() => {
            const date = new Date();
            const dateString = `${(date.getFullYear() < 10 ? "0" : "") + date.getFullYear()}-${(date.getMonth() + 1 < 10 ? "0" : "") + date.getMonth() + 1}-${(date.getDate() < 10 ? "0" : "") + date.getDate()}`;

            let message = this._queue.shift();

            FileUtil.fileExists(`${_dir}/logs/${dateString}.txt`).then(() => {
                FileUtil.readFile(`${_dir}/logs/${dateString}.txt`).then(content => {
                    content += message + "\n";
                    FileUtil.saveFile(`${_dir}/logs/${dateString}.txt`, content).then(() => {
                        if(this._queue.length > 0)
                            this.dequeue();

                        this._running = false;
                    }).catch(err => {
                        if(err)
                            console.error(err);

                        if(this._queue.length > 0)
                            this.dequeue();

                        this._running = false;
                    });
                }).catch(err => {
                    if(err)
                        console.error(err);

                    if(this._queue.length > 0)
                        this.dequeue();

                    this._running = false;
                });
            }).catch(err => {
                FileUtil.saveFile(`${_dir}/logs/${dateString}.txt`, message + "\n").then(() => {
                    if(this._queue.length > 0)
                        this.dequeue();

                    this._running = false;
                }).catch(err2 => {
                    if(err2)
                        console.error(err2);

                    if(this._queue.length > 0)
                        this.dequeue();

                    this._running = false;
                });
            });
        }).catch(err => {
            if(err.code === 'ENOENT') {
                DirectoryUtil.createDirectory(_dir + '/', 'logs').then(() => {
                    this.dequeue();
                    this._running = false;
                }).catch(err => {
                    if(err) {
                        console.error(err);
                    }
                    this._running = false;
                });
            }
        });
    }

}

module.exports = new LogFile();