'use strict';

class AccessConfiguration {

    static listen() {
        WebSuite.getWebSocketHandler().registerCpEvent('cp-access-configuration', (socket, data) => {
            WebSuite.getDatabase().query("SELECT * FROM wsConfigurationOptions WHERE name=?", ["maintenanceReason"]).then(result => {
                WebSuite.getWebSocketHandler().sendToClient(socket, 'cp-access-configuration', {maintenanceReason: result[0].value});
            }).catch(err => {
                // TODO
            });
        });

        WebSuite.getWebSocketHandler().registerCpEvent('cp-save-access-configuration', (socket, data) => {
            if(data.maintenanceReason !== undefined) {
                WebSuite.getDatabase().query("UPDATE wsConfigurationOptions SET value=? WHERE name=?", [data.maintenanceReason, "maintenanceReason"]).then(result => {
                    WebSuite.getWebSocketHandler().sendToClient(socket, 'cp-save-access-configuration', {});
                }).catch(err => {
                    console.log(err.message);
                    // TODO
                });
            }
        });
    }

}

module.exports = AccessConfiguration;