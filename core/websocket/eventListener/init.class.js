"use strict";

class DefaultData {

	static listen() {
		WebSuite.getWebSocketHandler().registerEvent("init", async (socket, data) => {
			try {
				if(typeof data.auth === "undefined") {
					// TODO: Auth
				}
				// TODO: Send basic information
			} catch(err) {
				// TODO: handle errors
			}
		});
	}

}

module.exports = DefaultData;