'use strict';

class GroupAdd {

    static listen() {
        WebSuite.getWebSocketHandler().registerCpEvent('cp-group-add-permissions', (socket, data) => {
            FileUtil.readFile(_dir + '/data/administrativePermissions.json').then(content => {
                WebSuite.getWebSocketHandler().sendToClient(socket, 'cp-group-add-permissions', content);
            }).catch(err => {

            });
        });
        WebSuite.getWebSocketHandler().registerCpEvent('cp-group-add', (socket, data) => {
            // TODO: Add logic
        });
    }

}

module.exports = GroupAdd;