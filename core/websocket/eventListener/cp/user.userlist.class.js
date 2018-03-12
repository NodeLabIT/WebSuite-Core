"use strict";

class UserList {

    static listen() {
        global.WebSuite.getWebSocketHandler().registerCpEvent("cp-user-list", (socket, data) => {
            let page = 1;
            if(data.page && data.page > 0) {
                page = data.page;
            }

            global.WebSuite.getDatabase().query('SELECT * FROM wsUser ORDER BY userID LIMIT ?,?', [((page-1) * 30), ((page)) * 30])
            .then((result) => {
                global.WebSuite.getDatabase().query('SELECT COUNT(*) AS count FROM wsUser', [])
                .then((count) => {
                    global.WebSuite.getWebSocketHandler().sendToClient(socket, "cp-user-list", {users: result, userCount: count[0].count});
                }). catch((err) => {
                    console.log(err);
                    global.WebSuite.getWebSocketHandler().sendToClient(socket, "cp-user-list", {err: err.message});
                });
            }). catch((err) => {
                console.log(err);
                global.WebSuite.getWebSocketHandler().sendToClient(socket, "cp-user-list", {err: err.message});
            });
        });
    }

}

module.exports = UserList;