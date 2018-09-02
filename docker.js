// THIS FILE ONLY EXECUTES REQUIRED CODE FOR DOCKER-VOLUMES

"use strict";

const fs = require('fs');

console.log("Copying files to docker-volume /opt/websuite/data");

const files = {
	"data/permissionsList/administrativePermissions.json": "/opt/websuite/data/permissionsList/administrativePermissions.json",
	"data/permissionsList/permissions.json": "/opt/websuite/data/permissionsList/permissions.json",
	"data/config.example.json": "/opt/websuite/data/config.json",
	"data/footerScript.js": "/opt/websuite/data/footerScript.js",
	"data/options.json": "/opt/websuite/data/options.json",
	"data/plugins.json": "/opt/websuite/data/plugins.json"
};

for (const file in files) {
	console.log("Copying " + file + " to " + files[file]);
	if(!fs.existsSync(files[file])) {
		console.log("COPYING FILES");
		fs.copyFileSync(file, files[file], COPYFILE_EXCL);
		continue;
	}
	console.log("File already exists in destination. Checking for Updates...");
}