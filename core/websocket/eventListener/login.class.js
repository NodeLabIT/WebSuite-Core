'use strict';

class Login {

    static listen() {
        WebSuite.getWebSocketHandler().registerEvent('login', (socket, data, address) => {
            console.log(address);
            console.log(data);
            WebSuite.getDatabase().query("SELECT COUNT(*) as count FROM wsFailedLogins WHERE ipAddress=? AND unixtime>=?", [address, TimeUtil.currentTime() - 24 * 60 * 60 * 1000]).then(count => {
                console.log(count[0].count);
                if(parseInt(count[0].count) < 10) {
                    // TODO: Add Captcha-Check
                    WebSuite.getUserHandler().getUserByUserName(data.username).then(user => {
                        const userID = user.getUserID();

                        WebSuite.getDatabase().query("SELECT password FROM wsUser WHERE userID=?", [userID]).then(password => {
                            FileUtil.readFile(_dir + "/data/userSalts.json").then(salts => {
                                salts = JSON.parse(salts);

                                if(CryptoUtil.matchPassword(data.password, password[0].password, salts[userID])) {
                                    console.log("Password matches");
                                    // TODO: Login
                                }
                                 else {
                                    console.log("Password doesn't match");
                                }
                            }).catch(err => {

                            });
                        }).catch(err => {

                        });
                    }).catch(err => {

                    });
                } else {
                    //
                }
            }).catch(err => {

            });
        });

        WebSuite.getWebSocketHandler().registerEvent('auto-login', (socket, data) => {

        });
    }

}

module.exports = Login;