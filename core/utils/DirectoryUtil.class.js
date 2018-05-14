"use strict";

const fs = require("fs");

class DirectoryUtil {

	/**
	 * Check, whether directory exists or not
	 *
	 * @param path path of the directory
	 *
	 * @returns Promise resolves on success, rejects on failure with error
	 * */
	static directoryExists(path) {
		return new Promise((resolve, reject) => {
			if(!path) {
				reject(new Error("undefined param"));
				return;
			}

			fs.stat(path, (err) => {
				if(err) {
					reject(err);
					return;
				}

				resolve();
			});
		});
	}

	/**
	 * Get all files and directories
	 *
	 * @param path path of the directory you want to get the content of
	 *
	 * @returns Promise resolves on success with files-list, rejects on failure with error
	 * */
	static files(path) {
		return new Promise((resolve, reject) => {
			if(!path) {
				reject(new Error("undefined param"));
				return;
			}

			fs.readdir(path, (err, files) => {
				if(err) {
					reject(err);
					return;
				}

				resolve(files);
			});
		});
	}

	/**
	 * Create a directory
	 *
	 * @param path path of the directory, where you want to create the directory in
	 * @param directoryName name of the directory, you want to create
	 *
	 * @returns Promise resolves on success, rejects on failure with error
	 * */
	static createDirectory(path, directoryName) {
		return new Promise((resolve, reject) => {
			if(!path || !directoryName) {
				reject(new Error("undefined param"));
				return;
			}

			if(!path.endsWith("/")) {
				path += "/";
			}

			fs.mkdir(path + directoryName, (err) => {
				if(err) {
					reject(err);
					return;
				}

				resolve();
			});
		});
	}

	/**
	 * Remove a directory
	 *
	 * @param path path of the directory
	 *
	 * @returns Promise resolves on success, rejects on failure with error
	 * */
	static removeDirectory(path) {
		return new Promise((resolve, reject) => {
			if(!path) {
				reject(new Error("undefined param"));
				return;
			}

			fs.rmdir(path, (err) => {
				if(err) {
					reject(err);
					return;
				}

				resolve();
			});
		});
	}

}

global.DirectoryUtil = DirectoryUtil;