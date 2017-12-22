<template>
    <div>
        <header>
            <i id="open-menu" class="fa fa-bars mobile-hidden"></i>

            <nav id="main-nav">
                <div class="container right">
                    <i id="close-menu" class="fa fa-times mobile-hidden"></i>

                    <h3 class="white mobile-hidden">Websuite 2</h3>

                    <router-link v-for="link in mainMenu" :to="`${link.link}`">
                        {{link.name | translate}}
                    </router-link>

                    <div class="dropdown" v-if="$root.loggedIn">
                        <a href="#">
                            <i class="fa fa-bell"></i>
                            <span class="notification-badge">1</span>
                            <span class="mobile-hidden">Benachrichtigungen</span>
                        </a>

                        <div class="dropdown-content notification">
                            <h4>Benachrichtigungen</h4>
                            <div class="content">
                                <div class="grid">
                                    <div class="row">
                                        <div class="col col8">
                                            <img src="images/avatars/58-446b0bd040e05628ad190369e7ed8317a7d2cfc1.jpg" alt="">
                                        </div>
                                        <div class="col col">
                                            <h5><a href="#">Marcel Reif</a> gefällt Ihr Beitrag im Thema <a href="#">Software-Update</a></h5>
                                            <h6>Vom 07.10.2017</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dropdown" v-if="$root.loggedIn">
                        <a href="#">
                            <i class="fa fa-comments"></i>
                            <span class="notification-badge">3</span>
                            <span class="mobile-hidden">Nachrichten</span>
                        </a>

                        <div class="dropdown-content notification">
                            <h4>Chat</h4>
                            <div class="content">
                                <div class="grid">
                                    <div class="row">
                                        <div class="col col8">
                                            <img src="images/profileimg.png" alt="">
                                        </div>
                                        <div class="col col">
                                            <h5><a href="#">Marcel Reif</a> gefällt Ihr Beitrag im Thema <a href="#">Software-Update</a></h5>
                                            <h6>Vom 07.10.2017</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div id="hero" class="container">
                <h2 class="white">Websuite 2</h2>
                <div class="maintext white">Willkommen zur zweiten Version der Websuite.</div>
            </div>

            <div id="sub-nav">
                <div class="container">
                    <a href="#" v-if="$root.loggedIn">
                        <i class="fa fa-user-circle-o left"></i>
                        Willkommen, {username}
                    </a>
                    <a href="/login" v-if="!$root.loggedIn">
                        Jetzt anmelden
                    </a>

                    <div class="container right align_right" v-if="$root.loggedIn">
                        <router-link class="margin15vert" :to="`${link.link}`" v-for="link in userMenu">{{link.name | translate}}</router-link>
                    </div>
                </div>
            </div>
        </header>

        <main>
            <router-view></router-view>
        </main>

        <footer>
            <div class="container">
                <router-link v-for="link in footerMenu.left" :to="`${link.link}`">{{ link.name | translate }}</router-link>

                <div class="container right">
                    <a v-for="link in footerMenu.right" v-bind:href="`${link.link}`" class="fa" v-bind:class="link.icon"></a>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    import { sio } from './main';

    import mainMenu from './main-menu.json';
    import userMenu from './user-menu.json';
    import footerMenu from './footer-menu.json';

    export default {
        data() {
            return {
                mainMenu,
                userMenu,
                footerMenu
            }
        },
        methods: {

        },
        created() {

        }
    }
</script>