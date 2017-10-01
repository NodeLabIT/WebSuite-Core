'use strict';

const WebSuite = require('../core/WebSuite.class');

class SystemLoader {

    constructor() {
        // TODO: TEST
        WebSuite.getWebSocketHandler().registerCpEvent('cp-test', (clientID, data) => {
            console.log(clientID);
            console.log(data);
        });
    }

}

module.exports = new SystemLoader();