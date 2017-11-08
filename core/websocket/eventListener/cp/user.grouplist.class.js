'use strict';

class GroupList {

    static listen() {
        WebSuite.getWebSocketHandler().registerCpEvent('cp-group-list', (socket, data) => {
            WebSuite.getDatabase().query('SELECT * FROM wsGroup ORDER BY groupID', [])
                .then(result => {
                    WebSuite.getWebSocketHandler().sendToClient(socket, 'cp-group-list', {groups: result});
                }). catch(err => {
                WebSuite.getLogger().error(err.message);
                WebSuite.getWebSocketHandler().sendToClient(socket, 'cp-group-list', {err: err.message});
            });
        });
    }

}

module.exports = GroupList;