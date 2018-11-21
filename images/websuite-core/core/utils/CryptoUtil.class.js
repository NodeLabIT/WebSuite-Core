"use strict";

const argon2 = require('argon2');

/**
 * Helperclass for hashing passwords.
 *
 * @hideconstructor
 * */
class CryptoUtil {

	/**
	 * Hashes a password using the hashing-algorithm argon2id. If no password is specified, the function will throw an
	 * error. If hashing fails, the function will throw an error. Otherwise the function returns the hashed password
	 * as argon2-string.
	 *
	 * @param {String} password The password that has to be hashed
	 *
	 * @return {String} Returns the argon2-hashed password
	 *
	 * @throws {Error}
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
	 * Compares the password against the argon2-hash (verification). If no hash or password is specified the function
	 * will throw an error. If the verification fails, the function will also terminate throwing an error. Otherwise
	 * the function returns a boolean indicating password-match. So returning true on password-match and false on
	 * password-mismatch.
	 *
	 * @param {String} hash The argon2-hash-string
	 * @param {String} password The raw (unhashed) password
	 *
	 * @return {Boolean} Returns true on password-match and false on password-mismatch
	 *
	 * @throws {Error}
	 * */
	static async verify(hash, password) {
		if(typeof hash === "undefined")
			throw new Error("undefined paramater");

		if(typeof password === "undefined")
			throw new Error("undefined paramater");

		return await argon2.verify(hash, password);
	}

}

global.CryptoUtil = CryptoUtil;