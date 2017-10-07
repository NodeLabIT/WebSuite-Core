'use strict';

class User {

    constructor(userID) {
        this.userID = userID;
    }

    /**
     * Get userID of user
     *
     * @returns userID
     * */
    getUserID() {
        return this.userID;
    }

    /**
     * Get list of user account-information (e.g. username, email-address, birthday, registration-time)
     *
     * @returns Promise Resolves with
     * */
    getUserInformation() {
        return new Promise((resolve, reject) => {
            WebSuite.getDatabase().query("SELECT * FROM wsUser, wsUserProfile WHERE wsUser.userID=? AND wsUser.userID = wsUserProfile.userID", [this.userID]).then(result => {
                resolve(result[0]);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * Get list of user profile-fields
     *
     * @returns Promise
     * */
    getUserProfileFields() {
        return new Promise((resolve, reject) => {
            WebSuite.getDatabase().query("SELECT wsConfigurationUserProfileInformation.informationName, wsUserProfileInformation.value FROM wsConfigurationUserProfileInformation, wsUserProfileInformation WHERE wsUserProfileInformation.userID = ? AND wsUserProfileInformation.informationID = wsConfigurationUserProfileInformation.informationID", [this.userID]).then(results => {
                resolve(results);
            }).catch(err => {
                reject(err);
            });
        });
    }

}

module.exports = User;