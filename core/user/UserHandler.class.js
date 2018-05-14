"use strict";

const User = require("./User.class");
const GuestGroup = require("./GuestGroup.class");

class UserHandler {

	/**
	 * The function queries the database and tries to fetch a user by the given parameter "userID". If an error occurs
	 * in the request (e.g. connection timeout, faulty sql-query), the Promise is rejected with this error.
	 * If the user doesn't exist, the Promise is rejected with the error message "no data found". Otherwise an object of
	 * the class {@link User} is returned as user (resolve Promise)
	 *
	 * @return {Promise}
	 *
	 * @param userID UserID, by that the user can be assigned
	 * */
	getUserByUserID(userID) {
		return new Promise((resolve, reject) => {
			WebSuite.getDatabase().query("SELECT * FROM wsUser WHERE userID=?", [userID]).then((result) => {
				if(typeof result === "undefined" || typeof result[0] === "undefined" || typeof result[0].userID === "undefined") {
					reject(new Error("no data found"));
				} else {
					resolve(new User(result[0].userID));
				}
			}).catch((err) => {
				reject(err);
			});
		});
	}

	/**
	 * The function queries the database and tries to fetch a user by the given parameter "username". If an error occurs
	 * in the request (e.g. connection timeout, faulty sql-query), the Promise is rejected with this error.
	 * If the user doesn't exist, the Promise is rejected with the error message "no data found". Otherwise an object of
	 * the class {@link User} is returned as user (resolve Promise)
	 *
	 * @return {Promise}
	 *
	 * @param username username, by that the user can be assigned
	 * */
	getUserByUserName(username) {
		return new Promise((resolve, reject) => {
			WebSuite.getDatabase().query("SELECT * FROM wsUser WHERE username=?", [username]).then((result) => {
				if(typeof result === "undefined" || typeof result[0] === "undefined" || typeof result[0].userID === "undefined") {
					reject(new Error("no data found"));
				} else {
					resolve(new User(result[0].userID));
				}
			}).catch((err) => {
				reject(err);
			});
		});
	}

	/**
	 * The function queries the database and tries to fetch a user by the given parameter "email". If an error occurs
	 * in the request (e.g. connection timeout, faulty sql-query), the Promise is rejected with this error.
	 * If the user doesn't exist, the Promise is rejected with the error message "no data found". Otherwise an object of
	 * the class {@link User} is returned as user (resolve Promise)
	 *
	 * @return {Promise}
	 *
	 * @param email email-address, by that the user can be assigned
	 * */
	getUserByEMail(email) {
		return new Promise((resolve, reject) => {
			WebSuite.getDatabase().query("SELECT * FROM wsUser WHERE email=?", [email]).then((result) => {
				if(typeof result === "undefined" || typeof result[0] === "undefined" || typeof result[0].userID === "undefined") {
					reject(new Error("no data found"));
				} else {
					resolve(new User(result[0].userID));
				}
			}).catch((err) => {
				reject(err);
			});
		});
	}

	getGuestGroup() {
		return GuestGroup;
	}

}

module.exports = new UserHandler();