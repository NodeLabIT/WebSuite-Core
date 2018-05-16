"use strict";

/* eslint-disable no-console */

const fs = require('fs');

class LogFile {

	constructor() {
		this.log = fs.createWriteStream(`${_dir}/logs/${TimeUtil.dateString()}.txt`, {flags:'a'});

		this.log.on('ready', () => {
			this.opened = true;
		});

		this.log.on('close', () => {
			this.opened = false;
		});
	}

	append(text) {
		if(this.opened === false) {
			this.log = fs.createWriteStream(`${_dir}/logs/${TimeUtil.dateString()}.txt`, {flags:'a'});

			this.log.on('ready', () => {
				this.log.write(text + "\n");
			});

			return;
		}

		this.log.write(text + "\n");
	}

}

module.exports = new LogFile();