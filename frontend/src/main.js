import Vue from 'vue'
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies';

import App from './App.vue';

import LinkComponent from './linkComponent.vue';

import Config from './config.json';
const routesConfig = require('./routes.json');

// Components

Vue.use(VueRouter);
Vue.use(VueCookies);

let routes = [];

for(let route of routesConfig) {
    routes.push({
        path: route.path,
        component: require('./components/' + route.component + ".vue")
    });
}

const router = new VueRouter({
    routes,
    mode: 'history'
});

let language = {};
$.ajax({
    dataType: "json",
    url: "/language/de_DE.json",
    success: function(data) {
        language = data;
        init();
    }
});

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
    Vue.filter('translate', (value) => {
        return language[value] === undefined ? value + " (untranslated)" : language[value];
    });

    Vue.component('ws-link', LinkComponent);

    let vue = new Vue({
        el: '#websuite',
        router,
        render: h => h(App),
        data: {
            loggedIn: false,
            title: "...",
            user: {}
        },
        methods: {
            isValid: function(input) {
                return input !== undefined && input !== "";
            }

        }
    });
}