"use strict";

const cron = require("node-cron");

class Cronjob {

    registerJob(time, handle) {
        if(typeof time === "undefined" || typeof handle === "undefined") {
            WebSuite.getLogger().warn("undefined Parameters registering new Cronjob!");
            return;
        }

        if(!cron.validate(time)) {
            WebSuite.getLogger().warn("given time is not a valid cron expression!");
            return;
        }

        cron.schedule(time, handle, true);
    }

}

module.exports = new Cronjob();