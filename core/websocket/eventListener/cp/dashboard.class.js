"use strict";

class Dashboard {

    static listen() {
        global.WebSuite.getWebSocketHandler().registerCpEvent("cp-restart-system", (socket, data) => {
            process.send(JSON.stringify({type: "system", action: "restart"}));
        });

        global.WebSuite.getWebSocketHandler().registerCpEvent("cp-recompile-system", (socket, data) => {
            // TODO: Compile LESS and Vue-Templates from Filesystem

            // TODO: success: deploy to webserver and let all Clients reconnect to the system
            // TODO: failure: log error and send information to user
        });
    }

}

module.exports = Dashboard;