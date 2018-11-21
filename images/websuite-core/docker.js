// THIS FILE ONLY EXECUTES REQUIRED CODE FOR DOCKER-VOLUMES

/* eslint-disable no-console */

"use strict";

const fs = require("fs");

console.log("Copying files to docker-volume /opt/websuite/data");

const files = {
	"default/permissionsList/administrativePermissions.json": "/opt/websuite/data/permissionsList/administrativePermissions.json",
	"default/permissionsList/permissions.json": "/opt/websuite/data/permissionsList/permissions.json",
	"default/config.json": "/opt/websuite/data/config.json",
	"default/footerScript.js": "/opt/websuite/data/footerScript.js",
	"default/options.json": "/opt/websuite/data/options.json",
	"default/plugins.json": "/opt/websuite/data/plugins.json"
};

function mkdirSync(directory) {
	const path = directory.split('/');

	for (let i = 1; i <= path.length; i++) {
		const segment = path.slice(0, i).join('/');
		console.log("Creating " + segment);
		!fs.existsSync(segment) ? fs.mkdirSync(segment) : null;
	}
}

mkdirSync("/opt/websuite/data/permissionsList");
mkdirSync("/opt/websuite/data/web/public/");

// STEP 1: Copy default files to docker-volume

for (const file in files) {
	console.log("Copying " + file + " to " + files[file]);
	if(!fs.existsSync(files[file])) {
		fs.copyFileSync(file, files[file], fs.constants.COPYFILE_EXCL);
		console.log("File copied!");
		continue;
	}
	console.log("File already exists in destination. Checking for Updates...");
}