"use strict";

const argon2 = require('argon2');

class CryptoUtil {

	/**
	 * The given password will be hashed using argon2id
	 *
	 * @param password
	 *
	 * @returns {String, Error} returns a String (the argon2-hash) or on error an Error
	 * */
	static async hash(password) {
		try {
			// TODO: Read this from cp-options
			const options = {
				type: argon2.argon2id,
				iterations: 3,
				memory: 4096,
				parallelism: 1
			};

			return await argon2.hash(password, options);
		} catch(err) {
			throw err;
		}
	}

	/**
	 * Check for password-match
	 *
	 * @param hash the hashed and salted password
	 * @param password the hashed and salted password
	 *
	 * @returns boolean true, when matches, otherwise false
	 * */
	static async verify(hash, password) {
		try {
			return await argon2.verify(hash, password);
		} catch (err) {
			// internal failure
			throw err;
		}
	}

}

global.CryptoUtil = CryptoUtil;