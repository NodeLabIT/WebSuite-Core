"use strict";

const Event = require("events");

class EventEmitter extends Event {}

module.exports = EventEmitter;