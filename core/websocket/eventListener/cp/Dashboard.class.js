'use strict';

class Dashboard {

    static listen() {
        WebSuite.getWebSocketHandler().registerCpEvent('cp-restart-system', (socket, data) => {
            console.log('test');
            process.send(JSON.stringify({type: "system", action: "soft-restart"}));
        });
    }

}

module.exports = Dashboard;