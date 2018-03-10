"use strict";

class DefaultData {

    static listen() {
        WebSuite.getWebSocketHandler().registerEvent('page-default-data', (socket, data) => {
            FileUtil.readFile(_dir + "/data/page.json").then(content => {
                WebSuite.getWebSocketHandler().sendToClient(socket, 'page-default-data', JSON.parse(content));
            }).catch(err => {
                WebSuite.getWebSocketHandler().sendToClient(socket, 'page-default-data', {err});
            });
        });
    }

}

module.exports = DefaultData;