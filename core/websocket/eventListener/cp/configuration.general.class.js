"use strict";

class GeneralConfiguration {

    static listen() {
        global.WebSuite.getWebSocketHandler().registerCpEvent("cp-general-configuration", (socket, data) => {
            global.FileUtil.readFile(`${global._dir}/data/page.json`).then((content) => {
                global.WebSuite.getWebSocketHandler().sendToClient(socket, "cp-general-configuration", JSON.parse(content));
            }).catch((err) => {
                global.WebSuite.getWebSocketHandler().sendToClient(socket, "cp-general-configuration", {err});
            });
        });

        global.WebSuite.getWebSocketHandler().registerCpEvent("cp-save-general-configuration", (socket, data) => {
            if(typeof data.title !== "undefined" && typeof data.subtitle !== "undefined" && typeof data.description !== "undefined" && typeof data.keywords !== "undefined" && typeof data.footerScript !== "undefined") {
                global.FileUtil.saveFile(`${global._dir}/data/page.json`, JSON.stringify(data, null, 2)).then(() => {
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