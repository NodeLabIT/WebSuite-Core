import Vue from 'vue'
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies';

import App from './App.vue';

import Config from './config.json';

// Components

Vue.use(VueRouter);
Vue.use(VueCookies);

const routes = [
    // Routes
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

let language = {};
$.ajax({
    dataType: "json",
    url: "/cp/language/de_DE.json",
    success: function(data) {
        language = data;
        init();
    }
});

const socket = io(`//${$(location).attr('hostname')}:${Config.socket}`);
export function sio() {
    return socket;
}

function init() {
    Vue.filter('translate', (value) => {
        return language[value] === undefined ? value + " (untranslated)" : language[value];
    });

    let vue = new Vue({
        el: '#wscp',
        router,
        render: h => h(App),
        data: {
            loggedIn: false
        },
        methods: {
            isValid: function(input) {
                return input !== undefined && input !== "";
            }
        },
        created() {

        }
    });
}