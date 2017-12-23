'use strict';

class Login {

    static listen() {
        WebSuite.getWebSocketHandler().registerEvent('login', (socket, data, address) => {
            console.log(address);
        });

        WebSuite.getWebSocketHandler().registerEvent('auto-login', (socket, data) => {

        });
    }

}

module.exports = Login;