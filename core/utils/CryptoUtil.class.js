"use strict";

const crypto = require("crypto");
const argon2 = require('argon2');

class CryptoUtil {

	/**
	 * The given password will be hashed using argon2id. While hashing a salt will be generated
	 *
	 * @param password
	 *
	 * @returns Object content: salt, hashed String
	 * */
	static async hashPassword(password) {
		try {
			const options = {
				type: argon2.argon2id
			};
			const hash = argon2.hash(password, options);

			return hash;
		} catch(err) {
			console.log(err);
			return err;
		}
	}

	/**
	 * Check for password-match
	 *
	 * @param raw the password
	 * @param hashed the hashed and salted password
	 *
	 * @returns boolean true, when matches, otherwise false
	 * */
	static async matchPassword(raw, hashed) {
		try {
			console.log(raw);
			console.log(hashed);
			if (await argon2.verify(hashed, raw)) {
				console.log("YEPPPP");
			} else {
				console.log("NOOOO :(");
			}
		} catch (err) {
			console.log(err);
			// internal failure
		}
	}

	/**
	 * Generates a salt (save it to a file and don't store it in the database!)
	 *
	 * @param length length of the salt
	 *
	 * @returns String random salt
	 * */
	static generateSalt(length) {
		return crypto.randomBytes(Math.ceil(length / 2)).toString("hex").slice(0, length);
	}

}

global.CryptoUtil = CryptoUtil;