"use strict";

class GuestGroup {

    hasPermission(permission) {
        return new Promise((resolve, reject) => {
            global.WebSuite.getDatabase().query("SELECT COUNT(*) AS count FROM wsGroupPermissions WHERE groupID = 0 AND permission = ?", [permission]).then((result) => {
                // resolve on result
                resolve(parseInt(result[0].count) > 0);
            }).catch((err) => {
                // reject on error
                reject(err);
            });
        });
    }

}

module.exports = new GuestGroup();