"use strict";

class GroupList {

    static listen() {
        WebSuite.getWebSocketHandler().registerCpEvent("cp-group-list", (socket, data) => {
            WebSuite.getDatabase().query('SELECT * FROM wsGroup ORDER BY groupID', [])
                .then(result => {
                    let counts = {};
                    let i = 0;
                    for(let res of result) {
                        const groupID = res.groupID;
                        WebSuite.getDatabase().query("SELECT COUNT(*) AS count FROM wsGroupUser WHERE wsGroupUser.groupID = ?", [groupID])
                            .then(count => {
                                i ++;
                                counts[groupID] = count[0];

                                if(i === result.length) {
                                    WebSuite.getWebSocketHandler().sendToClient(socket, "cp-group-list", {groups: result, counts});
                                }
                            }).catch(err=> {
                                console.log(err.message);
                                // TODO
                        });
                    }
                }). catch(err => {
                WebSuite.getLogger().error(err.message);
                WebSuite.getWebSocketHandler().sendToClient(socket, "cp-group-list", {err: err.message});
            });
        });
    }

}

module.exports = GroupList;