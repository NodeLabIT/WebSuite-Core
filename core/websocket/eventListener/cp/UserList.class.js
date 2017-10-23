'use strict';

class UserList {

    static listen() {
        WebSuite.getWebSocketHandler().registerCpEvent('cp-user-list', data => {

        })
    }

}

module.exports = UserList;