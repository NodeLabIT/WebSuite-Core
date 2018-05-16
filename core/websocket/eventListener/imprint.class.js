"use strict";

class DefaultData {

	static listen() {
		WebSuite.getWebSocketHandler().registerEvent("imprint", (socket, data) => {

		});
	}

}

module.exports = DefaultData;