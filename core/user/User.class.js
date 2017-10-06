'use strict';

class User {

    /**
     * @param userID userID of User you want tot work with
     * */
    constructor(userID) {
        WebSuite.getDatabase().query("SELECT * FROM wsUser WHERE userID=?", [userID]).then(result => {
            WebSuite.getLogger().debug("USER EXISTS");
            this._userID = userID;
        }).catch(err => {
            if(err.message !== "no data found") {
                WebSuite.getLogger().error(err);
            } else {
                WebSuite.getLogger().debug("USER DOESN'T EXIST");
            }
        });
    }

}

module.exports = User;