"use strict";

class User {

    static listen() {
        global.WebSuite.getWebSocketHandler().registerEvent("user-list", (socket, data) => {
            global.WebSuite.getSessions().getUserByClientID(socket).then((user) => {
                if(user !== null) {
                    user.hasPermission("core.frontend.user.list").then((has) => {
                        if(!has) {
                            global.WebSuite.getWebSocketHandler().sendToClient(socket, "user-list", {err: "permissionDenied"});
                            return;
                        }

                        global.WebSuite.getDatabase().query("SELECT wsUser.userID, wsUser.username, wsGroup.groupName FROM wsUser, wsGroupUser, wsGroup WHERE wsUser.userID = wsGroupUser.userID AND wsGroup.groupID = wsGroupUser.groupID ORDER BY wsGroup.groupID ASC, username ASC;").then((users) => {
                            global.WebSuite.getWebSocketHandler().sendToClient(socket, "user-list", {users: users});
                        }).catch((err) => {
                            global.WebSuite.getLogger().error(err);
                            global.WebSuite.getWebSocketHandler().sendToClient(socket, "user-list", {err: "error occurred"});
                        });
                    }).catch((err) => {
                        global.WebSuite.getLogger().error(err);
                        global.WebSuite.getWebSocketHandler().sendToClient(socket, "user-list", {err: "error occurred"});
                    });
                } else {
                    // GUEST
                    global.WebSuite.getUserHandler().getGuestGroup().hasPermission("core.frontend.user.list").then(has => {
                        if(!has) {
                            global.WebSuite.getWebSocketHandler().sendToClient(socket, "user-list", {err: "permissionDenied"});
                            return;
                        }

                        global.WebSuite.getDatabase().query("SELECT wsUser.userID, wsUser.username, wsGroup.groupName FROM wsUser, wsGroupUser, wsGroup WHERE wsUser.userID = wsGroupUser.userID AND wsGroup.groupID = wsGroupUser.groupID ORDER BY wsGroup.groupID ASC, username ASC;").then((users) => {
                            global.WebSuite.getWebSocketHandler().sendToClient(socket, "user-list", {users: users});
                        }).catch((err) => {
                            global.WebSuite.getLogger().error(err);
                            global.WebSuite.getWebSocketHandler().sendToClient(socket, "user-list", {err: "error occurred"});
                        });
                    }).catch((err) => {
                        global.WebSuite.getLogger().error(err);
                        global.WebSuite.getWebSocketHandler().sendToClient(socket, "user-list", {err: "error occurred"});
                    });
                }
            }).catch((err) => {
                global.WebSuite.getLogger().error(err);
                global.WebSuite.getWebSocketHandler().sendToClient(socket, "user-list", {err: "error occurred"});
            });
        });
    }

}

module.exports = User;