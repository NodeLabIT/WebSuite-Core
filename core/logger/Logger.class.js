'use strict';

class Logger {

    // TODO: Change format for logging-prefix

    logToFile(message) {
        DirectoryUtil.directoryExists(__dirname + '/../../logs/').then(() => {
            const date = new Date();
            const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

            FileUtil.fileExists(`${__dirname}/../../logs/${dateString}.txt`).then(() => {
                FileUtil.readFile(`${__dirname}/../../logs/${dateString}.txt`).then(content => {
                    content += "\n" + message;
                    FileUtil.saveFile(`${__dirname}/../../logs/${dateString}.txt`, content).then(() => {
                        console.err("added!");
                    }).catch(err => {
                        // TODO: Handle error
                    });
                }).catch(err => {
                    // TODO: Handle error
                });
            }).catch(err => {
                FileUtil.saveFile(`${__dirname}/../../logs/${dateString}.txt`, message).then(() => {
                    console.log("added!");
                }).catch(err2 => {
                    // TODO: Handle error
                });
            });
        }).catch(err => {
            if(err.code === 'ENOENT') {
                DirectoryUtil.createDirectory(__dirname + '/../../', 'logs').then(() => {
                    this.logToFile(message);
                }).catch(err => {
                    // TODO: Handle error
                });
            }
        });
    }

    /**
     * send info-message (green console-color)
     *
     * @param message message to send
     * @param master boolean whether sending from master or not (undefined when worker)
     * */
    info(message, master) {
        this.logToFile("Test");
        if(master) {
            console.log(`\x1b[32m[MASTER | ${process.pid}] \x1b[0m${message}`);
            return;
        }
        console.log(`\x1b[32m[WORKER | ${process.pid}] \x1b[0m${message}`);
    }

    /**
     * send debug-message (cyan console-color)
     *
     * @param message message to send
     * @param master boolean whether sending from master or not (undefined when worker)
     * */
    debug(message, master) {
        if(master) {
            console.log(`\x1b[36m[MASTER | ${process.pid}] \x1b[0m${message}`);
            return;
        }
        console.log(`\x1b[36m[WORKER | ${process.pid}] \x1b[0m${message}`);
    }

    /**
     * send error-message (red console-color)
     *
     * @param message message to send
     * @param master boolean whether sending from master or not (undefined when worker)
     * */
    error(message, master) {
        if(master) {
            console.log(`\x1b[31m[MASTER | ${process.pid}] \x1b[0m${message}`);
            return;
        }
        console.log(`\x1b[31m[WORKER | ${process.pid}] \x1b[0m${message}`);
    }

    /**
     * send warn-message (yellow console-color)
     *
     * @param message message to send
     * @param master boolean whether sending from master or not (undefined when worker)
     * */
    warn(message, master) {
        if(master) {
            console.log(`\x1b[33m[MASTER | ${process.pid}] \x1b[0m${message}`);
            return;
        }
        console.log(`\x1b[33m[WORKER | ${process.pid}] \x1b[0m${message}`);
    }

}

module.exports = new Logger();