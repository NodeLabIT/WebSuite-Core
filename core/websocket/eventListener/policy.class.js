"use strict";

class Policy {

	static listen() {
		WebSuite.getWebSocketHandler().registerEvent("imprint", async (socket, data) => {
			try {
				const file = await FileUtil.readFile(`${_dir}/data/options.json`);
				const json = JSON.parse(file);

				WebSuite.getWebSocketHandler().sendToClient(socket, "imprint", json.imprint);
			} catch (err) {
				console.log(err);
			}
		});

		WebSuite.getWebSocketHandler().registerEvent("privacy-policy", (socket, data) => {

		});
	}

}

module.exports = Policy;