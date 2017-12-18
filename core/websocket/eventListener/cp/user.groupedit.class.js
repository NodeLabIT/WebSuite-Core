'use strict';

class GroupAdd {

    static listen() {
        // TODO: Rewrite for Group Edit
        WebSuite.getWebSocketHandler().registerCpEvent('cp-group-add-permissions', (socket, data) => {
            FileUtil.readFile(_dir + '/data/administrativePermissions.json').then(contentCP => {
                FileUtil.readFile(_dir + '/data/permissions.json').then(content => {
                    WebSuite.getWebSocketHandler().sendToClient(socket, 'cp-group-add-permissions', {cp: JSON.parse(contentCP), frontend: JSON.parse(content)});
                }).catch(err => {
                    WebSuite.getWebSocketHandler().sendToClient(socket, 'cp-group-add-permissions', {err});
                });
            }).catch(err => {
                WebSuite.getWebSocketHandler().sendToClient(socket, 'cp-group-add-permissions', {err});
            });
        });
        WebSuite.getWebSocketHandler().registerCpEvent('cp-group-add', (socket, data) => {
            WebSuite.getDatabase().query("INSERT INTO wsGroup(groupName, groupDescription, displayName, displayColor, fontColor) VALUES (?, ?, ?, ?, ?)", [data.defaults.name, data.defaults.description, data.defaults.displayname, data.defaults.displaycolor, data.defaults.fontcolor]).then(result => {
                let permissions = [];
                for(let permission of data.permissions) {
                    permissions.push([result.insertId, permission]);
                }
                WebSuite.getDatabase().query("INSERT INTO wsGroupPermissions(groupID, permission) VALUES ?", [permissions]).then(success => {
                    WebSuite.getWebSocketHandler().sendToClient(socket, 'cp-group-add', {});
                }).catch(err => {
                    WebSuite.getWebSocketHandler().sendToClient(socket, 'cp-group-add', {err});
                });
            }).catch(err => {
                WebSuite.getWebSocketHandler().sendToClient(socket, 'cp-group-add', {err});
            });
        });
    }

}

module.exports = GroupAdd;