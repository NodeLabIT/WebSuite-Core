"use strict";

class GeneralConfiguration {

	static listen() {
		WebSuite.getWebSocketHandler().registerCpEvent("cp-general-configuration", (socket, data) => {
			global.FileUtil.readFile(`${global._dir}/data/page.json`).then((content) => {
				WebSuite.getWebSocketHandler().sendToClient(socket, "cp-general-configuration", JSON.parse(content));
			}).catch((err) => {
				WebSuite.getWebSocketHandler().sendToClient(socket, "cp-general-configuration", {err});
			});
		});

		WebSuite.getWebSocketHandler().registerCpEvent("cp-save-general-configuration", (socket, data) => {
			// TODO: Daten aus der page.json müssen gelesen werden und überschrieben werden, um die restliche Struktur nicht zu zerstören
			// TODO: ODER die generelle Konfiguration muss erweitert werden
			if(typeof data.title !== "undefined" && typeof data.subtitle !== "undefined" && typeof data.description !== "undefined" && typeof data.keywords !== "undefined" && typeof data.footerScript !== "undefined") {
				global.FileUtil.saveFile(`${global._dir}/data/page.json`, JSON.stringify(data, null, 2)).then(() => {
					WebSuite.getEventHandler().emit("general-configuration-changed", {});
					WebSuite.getWebSocketHandler().sendToClient(socket, "cp-save-general-configuration", {});
				}).catch((err) => {
					WebSuite.getWebSocketHandler().sendToClient(socket, "cp-save-general-configuration", {err});
				});
			}
		});
	}

}

module.exports = GeneralConfiguration;