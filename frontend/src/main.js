import Vue from "vue";

import App from "./App.vue";

import router from "./router";

import LinkComponent from "./components/ws-link.vue";
import UserInfoBox from "./components/ws-box-userinfo.vue";
import Dropdown from "./components/ws-dropdown.vue";

import Config from "./config/settings.json";

import load from "./tmp/load.js";

// Components

router.beforeEach((to, from, next) => {
	router.app.rendered = false;
	next();
});

const language = require("../language/de_DE");
let socket;

// TODO: Disallow connection for Bots to prevent crawling-errors
// TODO: Check for local storage (active session) and add them for request
if (!navigator.userAgent.includes("Googlebot")) {
	if (Config.connectionUrl !== "") {
		socket = io(Config.connectionUrl);
	} else {
		socket = io();
	}
}

export function sio() {
	return socket;
}

function init() {
	Vue.filter("translate", (value) => {
		return typeof language[value] === "undefined" ? value : language[value];
	});

	Vue.filter("urlify", function (value) {
		value = value.toLowerCase();

		value = value.replace(/[ä]/gi, "ae");
		value = value.replace(/[ö]/gi, "oe");
		value = value.replace(/[ü]/gi, "ue");

		value = value.replace(/\W/gi, "-");

		value = value.replace(/(-)\1+/gi, "-");
		return value;
	});

	Vue.component("ws-link", LinkComponent);
	Vue.component("ws-box-userinfo", UserInfoBox);
	Vue.component("ws-dropdown", Dropdown);

	let vue = new Vue({
		el: "#websuite",
		router,
		render: h => h(App),
		data: {
			loggedIn: false,
			page: {},
			user: {},
			dropdown: "",
			rendered: false
		},
		watch: {
			"rendered": function (value) {
				document.rendered = value;
			}
		},
		methods: {
			isValid: function (input) {
				return typeof input !== "undefined" && input !== "";
			},
			isDropdownVisible(id) {
				return this.dropdown === id;
			}
		},
		created() {
			this.page.title = document.title;

			sio().emit("page-default-data", {});
			sio().on("page-default-data", data => {
				if (data.err) {
					return;
				}
				this.page = data;
			});
		}
	});
}

socket.on("connect", () => {
	if(window.localStorage.getItem("user") !== null) {
		document.getElementById("loading-status").innerText = "Anmeldung wird ausgeführt...";
		const user = JSON.parse(window.localStorage.getItem("user"));
		socket.emit("init", {auth: user});
	} else {
		document.getElementById("loading-status").innerText = "Informationen werden abgerufen...";
		socket.emit("init", {});
	}
});

socket.on("init", (data) => {
	init();
});