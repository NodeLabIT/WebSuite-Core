'use strict';

const fs = require('fs');

class DirectoryUtil {

    static directoryExists(path) {
        return new Promise((resolve, reject) => {
            fs.stat(path, (err) => {
                if(err) {
                    reject(err);
                    return;
                }

                resolve();
            });
        });
    }

    static files(path) {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                if(err) {
                    reject(err);
                    return;
                }

                resolve(files);
            })
        });
    }

    static createDirectory(path) {
        return new Promise((resolve, reject) => {
            fs.mkdir(path, (err) => {
                if(err) {
                    reject(err);
                    return;
                }

                resolve();
            });
        });
    }

    static removeDirectory(path) {
        return new Promise((resolve, reject) => {
            fs.rmdir(path, (err) => {
                if(err) {
                    reject(err);
                    return;
                }

                resolve();
            });
        });
    }

}

global.DirectoryUtil = DirectoryUtil;