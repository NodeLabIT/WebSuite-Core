'use strict';

class GroupAdd {

    static listen() {
        WebSuite.getWebSocketHandler().registerCpEvent('cp-group-add-permissions', (socket, data) => {
            FileUtil.readFile(_dir + '/data/administrativePermissions.json').then(contentCP => {
                FileUtil.readFile(_dir + '/data/permissions.json').then(content => {
                    WebSuite.getWebSocketHandler().sendToClient(socket, 'cp-group-add-permissions', {cp: JSON.parse(contentCP), frontend: JSON.parse(content)});
                }).catch(err => {

                });
            }).catch(err => {

            });
        });
        WebSuite.getWebSocketHandler().registerCpEvent('cp-group-add', (socket, data) => {
            WebSuite.getDatabase().query("INSERT INTO wsGroup(groupName, groupDescription, displayName, displayColor, fontColor) VALUES (?, ?, ?, ?, ?)", [data.defaults.name, data.defaults.description, data.defaults.displayname, data.defaults.displaycolor, data.defaults.fontcolor]).then(result => {
                WebSuite.getWebSocketHandler().sendToClient(socket, 'cp-group-add', {success: true});
            }).catch(err => {

            })
        });
    }

}

module.exports = GroupAdd;