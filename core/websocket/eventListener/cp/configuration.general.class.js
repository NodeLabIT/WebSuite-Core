"use strict";

class GeneralConfiguration {

    static listen() {
        WebSuite.getWebSocketHandler().registerCpEvent("cp-general-configuration", (socket, data) => {
            FileUtil.readFile(`${_dir}/data/page.json`).then(content => {
                WebSuite.getWebSocketHandler().sendToClient(socket, "cp-general-configuration", JSON.parse(content));
            }).catch(err => {
                WebSuite.getWebSocketHandler().sendToClient(socket, "cp-general-configuration", {err});
            });
        });

        WebSuite.getWebSocketHandler().registerCpEvent("cp-save-general-configuration", (socket, data) => {
            if(data.title !== undefined && data.subtitle !== undefined && data.description !== undefined && data.keywords !== undefined && data.footerScript !== undefined) {
                FileUtil.saveFile(`${_dir}/data/page.json`, JSON.stringify(data, null, 2)).then(() => {
                    WebSuite.getEventHandler().emit("general-configuration-changed", {});
                    WebSuite.getWebSocketHandler().sendToClient(socket, "cp-save-general-configuration", {});
                }).catch(err => {
                    WebSuite.getWebSocketHandler().sendToClient(socket, "cp-save-general-configuration", {err});
                });
            }
        });
    }

}

module.exports = GeneralConfiguration;