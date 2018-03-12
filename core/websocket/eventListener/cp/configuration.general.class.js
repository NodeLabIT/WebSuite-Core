"use strict";

class GeneralConfiguration {

    static listen() {
        global.WebSuite.getWebSocketHandler().registerCpEvent("cp-general-configuration", (socket, data) => {
            global.FileUtil.readFile(`${_dir}/data/page.json`).then((content) => {
                global.WebSuite.getWebSocketHandler().sendToClient(socket, "cp-general-configuration", JSON.parse(content));
            }).catch((err) => {
                global.WebSuite.getWebSocketHandler().sendToClient(socket, "cp-general-configuration", {err});
            });
        });

        global.WebSuite.getWebSocketHandler().registerCpEvent("cp-save-general-configuration", (socket, data) => {
            if(data.title !== undefined && data.subtitle !== undefined && data.description !== undefined && data.keywords !== undefined && data.footerScript !== undefined) {
                global.FileUtil.saveFile(`${_dir}/data/page.json`, JSON.stringify(data, null, 2)).then(() => {
                    global.WebSuite.getEventHandler().emit("general-configuration-changed", {});
                    global.WebSuite.getWebSocketHandler().sendToClient(socket, "cp-save-general-configuration", {});
                }).catch((err) => {
                    global.WebSuite.getWebSocketHandler().sendToClient(socket, "cp-save-general-configuration", {err});
                });
            }
        });
    }

}

module.exports = GeneralConfiguration;