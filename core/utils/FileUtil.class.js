"use strict";

const fs = require("fs");

class FileUtil {

	/**
	 * Check, whether file exists or not
	 *
	 * @param path path of the file
	 *
	 * @returns Promise resolves on success, rejects on failure with error
	 * */
	static fileExists(path) {
		return new Promise((resolve, reject) => {
			if(typeof path === "undefined") {
				reject(new Error("undefined param"));
				return;
			}

			fs.access(path, (err) => {
				if(err) {
					reject(err);
					return;
				}

				resolve();
			});
		});
	}

	/**
	 * Reads a file
	 *
	 * @param path path to the file
	 *
	 * @returns Promise resolves on success with file-content, rejects on failure with error
	 * */
	static readFile(path) {
		return new Promise((resolve, reject) => {
			if(typeof path === "undefined") {
				reject(new Error("undefined param"));
			}

			this.fileExists(path).then(() => {
				fs.readFile(path, "utf-8", (err, content) => {
					if(err) {
						reject(err);
						return;
					}

					resolve(content);
				});
			}).catch((err) => {
				reject(err);
			});
		});
	}

	/**
	 * Saves a file
	 *
	 * @param path path to the file
	 * @param content content to save in the file
	 *
	 * @returns Promise resolves on success, rejects on failure with error
	 * */
	static saveFile(path, content) {
		return new Promise((resolve, reject) => {
			if(typeof path === "undefined" || typeof content === "undefined") {
				reject(new Error("undefined param"));
			}

			fs.writeFile(path, content, "utf-8", (err) => {
				if(err) {
					reject(err);
					return;
				}

				resolve();
			});
		});
	}

}

global.FileUtil = FileUtil;