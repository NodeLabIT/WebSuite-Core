"use strict";

class AccessConfiguration {

    static listen() {
        global.WebSuite.getWebSocketHandler().registerCpEvent("cp-access-configuration", (socket, data) => {
            global.WebSuite.getDatabase().query("SELECT * FROM wsConfigurationOptions WHERE name=?", ["maintenanceReason"]).then((result) => {
                global.WebSuite.getWebSocketHandler().sendToClient(socket, "cp-access-configuration", {maintenanceReason: result[0].value});
            }).catch((err) => {
                // TODO
            });
        });

        global.WebSuite.getWebSocketHandler().registerCpEvent("cp-save-access-configuration", (socket, data) => {
            if(data.maintenanceReason !== undefined) {
                global.WebSuite.getDatabase().query("UPDATE wsConfigurationOptions SET value=? WHERE name=?", [data.maintenanceReason, "maintenanceReason"]).then((result) => {
                    global.WebSuite.getWebSocketHandler().sendToClient(socket, "cp-save-access-configuration", {});
                }).catch((err) => {
                    console.log(err.message);
                    // TODO
                });
            }
        });
    }

}

module.exports = AccessConfiguration;