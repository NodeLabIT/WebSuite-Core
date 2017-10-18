'use strict';

const fs = require('fs');

class FileUtil {

    /**
     * Check, whether file exists or not
     *
     * @param path path of the file
     *
     * @returns Promise resolves on success, rejects on failure with error
     * */
    static fileExists(path) {
        return new Promise((resolve, reject) => {
            if(!path) {
                reject(new Error('undefined param'));
                return;
            }

            fs.access(path, (err) => {
                if(err) {
                    reject(err);
                    return;
                }

                resolve();
            });
        });
    }

}

global.FileUtil = FileUtil;