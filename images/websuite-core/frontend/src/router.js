import Vue from 'vue';
import Router from 'vue-router';

const routesConfig = require("./config/routes.json");

Vue.use(Router);

let routes = [];

for (let route of routesConfig) {
	routes.push({
		path: route.path,
		component: require("./pages/" + route.componentUrl + ".vue")
	});
}

const router = new Router({
	routes,
	mode: "history"
});

export default router;