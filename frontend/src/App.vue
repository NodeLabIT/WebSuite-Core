<template>
    <div>
        <div class="helper">
            <header>
                <i id="open-menu" @click="openMenu();" class="fa fa-bars mobile-only"></i>

                <nav id="main-nav" class="relative">
                    <div class="container right">
                        <i id="close-menu" @click="closeMenu();" class="fa fa-times mobile-only"></i>

                        <h3 class="white mobile-only">{{ $root.page.title }}</h3>

                        <ws-link v-for="link in mainMenu" :link="link"></ws-link>

                        <ws-dropdown v-if="$root.loggedIn" :title="'Benachrichtigungen'" :id="'notifications'" :badge="'1'" :icon="'fa-bell'">
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
                        </ws-dropdown>
                        <ws-dropdown v-if="$root.loggedIn" :title="'Chats'" :id="'chats'" :badge="'99+'" :icon="'fa-comments-o'">
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
                        </ws-dropdown>
                    </div>
                </nav>

                <div id="hero" class="container">
                    <h2 class="white">{{ $root.page.title }}</h2>
                    <div class="maintext white">{{ $root.page.subtitle }}</div>
                </div>

                <div id="sub-nav">
                    <div class="container" v-if="$root.loggedIn">
                        Willkommen, {{ $root.user.username }}

                        <div class="container right align_right">
                            <ws-link v-for="link in userMenu" :link="link" :cssClass="'margin15vert'"></ws-link>
                        </div>
                    </div>
                    <div class="container" v-else>
                        <span>
                            Willkommen!
                        </span>

                        <div class="container right align_right">
                            <router-link to="/login" class="margin15vert">Anmelden oder Registrieren</router-link>
                        </div>
                    </div>
                </div>
            </header>

            <main class="container">
                <router-view></router-view>
            </main>
        </div>

        <footer>
            <div class="container">
                <ws-link v-for="link in footerMenu.left" :link="link"></ws-link>

                <div class="container right">
                    <ws-link v-for="link in footerMenu.right" :link="link"></ws-link>
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
            openMenu() {
                $('#main-nav').addClass('visible');
                $('.dark-overlay').addClass('visible');
            },
            closeMenu() {
                $('#main-nav').removeClass('visible');
                $('.dark-overlay').removeClass('visible');
            }
        },
        created() {

        }
    }
</script>