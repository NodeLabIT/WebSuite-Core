"use strict";

class GroupAdd {

    static listen() {
        global.WebSuite.getWebSocketHandler().registerCpEvent("cp-group-add-permissions", (socket, data) => {
            global.FileUtil.readFile(`${_dir}/data/administrativePermissions.json`).then((contentCP) => {
                global.FileUtil.readFile(`${_dir}/data/permissions.json`).then((content) => {
                    global.WebSuite.getWebSocketHandler().sendToClient(socket, "cp-group-add-permissions", {cp: JSON.parse(contentCP), frontend: JSON.parse(content)});
                }).catch((err) => {
                    global.WebSuite.getWebSocketHandler().sendToClient(socket, "cp-group-add-permissions", {err});
                });
            }).catch((err) => {
                global.WebSuite.getWebSocketHandler().sendToClient(socket, "cp-group-add-permissions", {err});
            });
        });
        global.WebSuite.getWebSocketHandler().registerCpEvent("cp-group-add", (socket, data) => {
            global.WebSuite.getDatabase().query("INSERT INTO wsGroup(groupName, groupDescription, displayName, displayColor, fontColor) VALUES (?, ?, ?, ?, ?)", [data.defaults.name, data.defaults.description, data.defaults.displayname, data.defaults.displaycolor, data.defaults.fontcolor]).then((result) => {
                let permissions = [];
                for(let permission of data.permissions) {
                    permissions.push([result.insertId, permission]);
                }
                global.WebSuite.getDatabase().query("INSERT INTO wsGroupPermissions(groupID, permission) VALUES ?", [permissions]).then((success) => {
                    global.WebSuite.getWebSocketHandler().sendToClient(socket, "cp-group-add", {});
                }).catch((err) => {
                    global.WebSuite.getWebSocketHandler().sendToClient(socket, "cp-group-add", {err});
                });
            }).catch((err) => {
                global.WebSuite.getWebSocketHandler().sendToClient(socket, "cp-group-add", {err});
            });
        });
    }

}

module.exports = GroupAdd;