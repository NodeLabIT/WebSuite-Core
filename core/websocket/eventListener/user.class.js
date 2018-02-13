'use strict';

class User {

    static listen() {
        WebSuite.getWebSocketHandler().registerEvent('userlist', (socket, data) => {
            WebSuite.getSessions().getUserByClientID(socket).then(user => {
                if(user !== null) {
                    user.hasPermission("core.frontend.user.list").then(has => {
                        if(!has) {
                            WebSuite.getWebSocketHandler().sendToClient(socket, 'userlist', {err: 'permissionDenied'});
                            return;
                        }

                        WebSuite.getDatabase().query("SELECT wsUser.userID, wsUser.username, wsGroup.groupName FROM wsUser, wsGroupUser, wsGroup WHERE wsUser.userID = wsGroupUser.userID AND wsGroup.groupID = wsGroupUser.groupID ORDER BY wsGroup.groupID ASC, username ASC;").then(users => {
                            WebSuite.getWebSocketHandler().sendToClient(socket, 'userlist', {users: users});
                        }).catch(err => {
                            WebSuite.getLogger().error(err);
                            WebSuite.getWebSocketHandler().sendToClient(socket, 'userlist', {err: 'error occurred'});
                        });
                    }).catch(err => {
                        WebSuite.getLogger().error(err);
                        WebSuite.getWebSocketHandler().sendToClient(socket, 'userlist', {err: 'error occurred'});
                    });
                } else {
                    // GUEST
                    WebSuite.getUserHandler().getGuestGroup().hasPermission("core.frontend.user.list").then(has => {
                        if(!has) {
                            WebSuite.getWebSocketHandler().sendToClient(socket, 'userlist', {err: 'permissionDenied'});
                            return;
                        }

                        WebSuite.getDatabase().query("SELECT wsUser.userID, wsUser.username, wsGroup.groupName FROM wsUser, wsGroupUser, wsGroup WHERE wsUser.userID = wsGroupUser.userID AND wsGroup.groupID = wsGroupUser.groupID ORDER BY wsGroup.groupID ASC, username ASC;").then(users => {
                            WebSuite.getWebSocketHandler().sendToClient(socket, 'userlist', {users: users});
                        }).catch(err => {
                            WebSuite.getLogger().error(err);
                            WebSuite.getWebSocketHandler().sendToClient(socket, 'userlist', {err: 'error occurred'});
                        });
                    }).catch(err => {
                        WebSuite.getLogger().error(err);
                        WebSuite.getWebSocketHandler().sendToClient(socket, 'userlist', {err: 'error occurred'});
                    });
                }
            }).catch(err => {
                WebSuite.getLogger().error(err);
                WebSuite.getWebSocketHandler().sendToClient(socket, 'userlist', {err: 'error occurred'});
            });
        });
    }

}

module.exports = User;