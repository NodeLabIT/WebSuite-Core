"use strict";

const cron = require("node-cron");

class Cronjob {

    registerJob(time, handle) {
        if(!time || !handle) {
            global.WebSuite.getLogger().warn("undefined Parameters registering new Cronjob!");
            return;
        }

        if(!cron.validate(time)) {
            global.WebSuite.getLogger().warn("given time is not a valid cron expression!");
            return;
        }

        cron.schedule(time, handle, true);
    }

}

module.exports = new Cronjob();