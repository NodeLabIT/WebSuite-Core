'use strict';

const request = require('request');

class Register {

    static listen() {
        WebSuite.getWebSocketHandler().registerEvent('login', (socket, data, address) => {
            WebSuite.getDatabase().query("SELECT COUNT(*) AS count FROM wsFailedLogins WHERE ipAddress=? AND unixtime>=? AND type='registration'", [address, TimeUtil.currentTime() - 12 * 60 * 60 * 1000]).then(count => {
                if (parseInt(count[0].count) < 3) {
                    const secretKey = require('../../../config.json').secretKey;
                    const verifiyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${data.captcha}&remoteip=${address}`;

                    request(verifiyUrl, (err, response, body) => {
                        body = JSON.parse(body);

                        if (body.success !== undefined && !body.success) {
                            WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {
                                err: "captcha failed",
                                id: -1
                            });
                            this.addToBlocklist(address, false);
                            return;
                        }

                        // TODO:
                    });
                } else {
                    WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {err: "blocked by server", id: -1});
                }
            }).catch(err => {
                WebSuite.getWebSocketHandler().sendToClient(socket, 'login', {err: "servererror", id: -1});
                WebSuite.getLogger().error(err);

            });
        });
    }

    /**
     * @private
     * */
    static addToBlocklist(ipAddress) {
        WebSuite.getDatabase().query("INSERT INTO wsFailedLogins(ipAddress, unixtime, type) VALUES (?, ?, ?)", [ipAddress, Date.now(), "registration"]).then(success => {
            WebSuite.getLogger().info("Added "+ ipAddress + " to local blocklist");
        }).catch(err => {
            WebSuite.getLogger().error(err);
        });
    }

}

module.exports = Login;