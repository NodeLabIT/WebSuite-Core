import Vue from "vue";
import VueRouter from "vue-router";
import VueCookies from "vue-cookies";

import App from "./App.vue";

import Config from "./config.json";
const routesConfig = require("./routes.json");

// Components

Vue.use(VueRouter);
Vue.use(VueCookies);

let routes = [];

for(let route of routesConfig) {
	routes.push({
		path: route.path,
		component: require("./components/" + route.component + ".vue")
	});
}

const router = new VueRouter({
	routes,
	mode: "history"
});

let language = {};
let socket;

// TODO: Disallow connection for Bots to prevent crawling-errors
if(!navigator.userAgent.includes("Googlebot")) {
	if(Config.connectionUrl !== "") {
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
		return typeof language[value] === "undefined" ? value + " (untranslated)" : language[value];
	});

	let vue = new Vue({
		el: "#wscp",
		router,
		render: h => h(App),
		data: {
			loggedIn: false,
			title: "...",
			openedDialog: undefined
		},
		methods: {
			isValid: function(input) {
				return typeof input !== "undefined" && input !== "";
			},
			openDialog(dialogId) {
				if(typeof this.openedDialog !== "undefined" || this.openedDialog !== null) {
					this.closeDialog(this.openedDialog);
				}
				$(dialogId).removeClass('closed');
				this.openedDialog = dialogId;
			},
			closeDialog(dialogId) {
				$(dialogId).addClass("fade");
				$(dialogId).one("webkitAnimationEnd onanimationend msAnimationEnd", (event) => {
					$(dialogId).addClass("closed");
					$(dialogId).removeClass("fade");
				});
				this.openedDialog = null;
			}
		},
		created() {
			//this.$router.push('/login');
		}
	});
}

$.ajax({
	dataType: "json",
	url: "/cp/language/de_DE.json",
	success: function(data) {
		language = data;
		init();
	}
});