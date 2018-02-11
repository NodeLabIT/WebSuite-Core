import Vue from 'vue'
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies';

import App from './App.vue';

import LinkComponent from './components/ws-link.vue';
import UserInfoBox from './components/ws-box-userinfo.vue';
import Dropdown from './components/ws-dropdown.vue';

import Config from './config/settings.json';
const routesConfig = require('./config/routes.json');

// Components

Vue.use(VueRouter);
Vue.use(VueCookies);

let routes = [];

for(let route of routesConfig) {
    routes.push({
        path: route.path,
        component: require('./pages/' + route.component + ".vue")
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
        return language[value] === undefined ? value + " (ut)" : language[value];
    });

    Vue.component('ws-link', LinkComponent);
    Vue.component('ws-box-userinfo', UserInfoBox);
    Vue.component('ws-dropdown', Dropdown);

    let vue = new Vue({
        el: '#websuite',
        router,
        render: h => h(App),
        data: {
            loggedIn: false,
            page: {},
            user: {},
            dropdown: "",
            pageLoad: {
                loading: true,
                status: 0,
                required: 1
            }
        },
        watch: {
            'pageLoad.status': function(value) {
                if(this.pageLoad.loading && this.pageLoad.status === this.pageLoad.required) {
                    this.pageLoad.loading = false;
                    document.rendered = true;
                }
            },
            '$route': function(to, from) {
                this.pageLoad.loading = false;
                this.pageLoad.required = 1;
                this.pageLoad.status = 0;
            }
        },
        methods: {
            isValid: function(input) {
                return input !== undefined && input !== "";
            },
            isDropdownVisible(id) {
                return this.dropdown === id;
            }
        },
        created() {
            setTimeout(() => {
                this.pageLoad.status ++;
            }, 3000);

            this.page.title = document.title;

            if(this.$cookies.isKey("userID") && this.$cookies.isKey("sessionID")) {
                sio().emit("auto-login", {userID: this.$cookies.get("userID"), sessionID: this.$cookies.get("sessionID")});
            }

            sio().on("auto-login", data => {
                if(data.err) {
                    this.$cookies.remove("userID");
                    this.$cookies.remove("sessionID");
                    return;
                }
                this.loggedIn = true;
                this.user = {
                    userID: data.userID,
                    username: data.username
                };

                if(data.stay === 1) {
                    this.$cookies.set("userID", data.userID, 90 * 24 * 60 * 60);
                    this.$cookies.set("sessionID", data.sessionID, 90 * 24 * 60 * 60);
                } else {
                    this.$cookies.set("userID", data.userID, 8 * 60 * 60);
                    this.$cookies.set("sessionID", data.sessionID, 8 * 60 * 60);
                }
            });

            sio().emit('page-default-data', {});
            sio().on('page-default-data', data => {
                if(data.err) {
                    return;
                }
                this.page = data;
            });
        }
    });
}