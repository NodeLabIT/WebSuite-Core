<template>
    <div>
        <header class="header">
            <nav class="primary">
                <div class="left">
                    <router-link to="/dashboard">
                        {{ 'dashboard' | translate }}
                    </router-link>
                    <router-link to="/configuration">
                        {{ 'configuration' | translate }}
                    </router-link>
                    <router-link to="/users" class="active">
                        {{ 'users' | translate }}
                    </router-link>
                    <router-link to="/application">
                        {{ 'applications' | translate }}
                    </router-link>
                    <router-link to="/appearance">
                        {{ 'appearance' | translate }}
                    </router-link>
                    <router-link to="/other">
                        {{ 'other' | translate }}
                    </router-link>
                </div>
                <div class="right">
                    <a id="dropdown"><img src="https://dev-talk.net/images/avatars/44/58-446b0bd040e05628ad190369e7ed8317a7d2cfc1.jpg" width="32" height="32"><i class="material-icons">keyboard_arrow_down</i></a>
                </div>
            </nav>
            <div class="page-title">
                <h1>
                    Mitgliederverwaltung
                </h1>
            </div>
            <nav class="secondary">
                <router-link to="/dashboard" class="active">
                    Mitglieder <span class="badge">4.6k</span>
                </router-link>
                <router-link to="/dashboard">
                    Gruppen <span class="badge">47</span>
                </router-link>
                <router-link to="/dashboard">
                    Sanktionen <span class="badge">713</span>
                </router-link>
            </nav>
        </header>
        <main class="main">
            <a class="floating-button"><i class="material-icons">add</i></a>
            <table>
                <thead class="uppercase">
                    <tr>
                        <td style="width: 48px;"><i class="material-icons">indeterminate_check_box</i></td>
                        <td style="width: calc(40% - 48);"></td>
                        <td style="width: 12.5%;">Rang</td>
                        <td style="width: 7.5%;">Punkte</td>
                        <td style="width: calc(20% - 24px);">registriert</td>
                        <td style="width: calc(20% - 24px);">letzte aktivität</td>
                        <td style="width: 48px;"></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><i class="material-icons">check_box_outline_blank</i></td>
                        <td>
                            <img src="https://dev-talk.net/images/avatars/44/58-446b0bd040e05628ad190369e7ed8317a7d2cfc1.jpg" width="44" height="44">
                            <div class="inliner">
                                <span class="primary-text">ilou</span>
                                <span>info@nodelab-it.de</span>
                            </div>
                        </td>
                        <td>Administrator</td>
                        <td>6132</td>
                        <td>am 04.01.2017, 13:57 Uhr</td>
                        <td>vor 17 Minuten</td>
                        <td><i class="material-icons">more_horiz</i></td>
                    </tr>
                    <tr>
                        <td><i class="material-icons">check_box_outline_blank</i></td>
                        <td>
                            <img src="https://dev-talk.net/images/avatars/44/58-446b0bd040e05628ad190369e7ed8317a7d2cfc1.jpg" width="44" height="44">
                            <div class="inliner">
                                <span class="primary-text">ilou</span>
                                <span>info@nodelab-it.de</span>
                            </div>
                        </td>
                        <td>Administrator</td>
                        <td>6132</td>
                        <td>am 04.01.2017, 13:57 Uhr</td>
                        <td>vor 17 Minuten</td>
                        <td><i class="material-icons">more_horiz</i></td>
                    </tr>
                    <tr>
                        <td><i class="material-icons active">check_box</i></td>
                        <td>
                            <img src="https://dev-talk.net/images/avatars/44/58-446b0bd040e05628ad190369e7ed8317a7d2cfc1.jpg" width="44" height="44">
                            <div class="inliner">
                                <span class="primary-text">ilou</span>
                                <span>info@nodelab-it.de</span>
                            </div>
                        </td>
                        <td>Administrator</td>
                        <td>6132</td>
                        <td>am 04.01.2017, 13:57 Uhr</td>
                        <td>vor 17 Minuten</td>
                        <td><i class="material-icons">more_horiz</i></td>
                    </tr>
                    <tr>
                        <td><i class="material-icons active">check_box</i></td>
                        <td>
                            <img src="https://dev-talk.net/images/avatars/44/58-446b0bd040e05628ad190369e7ed8317a7d2cfc1.jpg" width="44" height="44">
                            <div class="inliner">
                                <span class="primary-text">ilou</span>
                                <span>info@nodelab-it.de</span>
                            </div>
                        </td>
                        <td>Administrator</td>
                        <td>6132</td>
                        <td>am 04.01.2017, 13:57 Uhr</td>
                        <td>vor 17 Minuten</td>
                        <td><i class="material-icons">more_horiz</i></td>
                    </tr>
                    <tr>
                        <td><i class="material-icons">check_box_outline_blank</i></td>
                        <td>
                            <img src="https://dev-talk.net/images/avatars/44/58-446b0bd040e05628ad190369e7ed8317a7d2cfc1.jpg" width="44" height="44">
                            <div class="inliner">
                                <span class="primary-text">ilou</span>
                                <span>info@nodelab-it.de</span>
                            </div>
                        </td>
                        <td>Administrator</td>
                        <td>6132</td>
                        <td>am 04.01.2017, 13:57 Uhr</td>
                        <td>vor 17 Minuten</td>
                        <td><i class="material-icons">more_horiz</i></td>
                    </tr>
                    <tr>
                        <td><i class="material-icons">check_box_outline_blank</i></td>
                        <td>
                            <img src="https://dev-talk.net/images/avatars/44/58-446b0bd040e05628ad190369e7ed8317a7d2cfc1.jpg" width="44" height="44">
                            <div class="inliner">
                                <span class="primary-text">ilou</span>
                                <span>info@nodelab-it.de</span>
                            </div>
                        </td>
                        <td>Administrator</td>
                        <td>6132</td>
                        <td>am 04.01.2017, 13:57 Uhr</td>
                        <td>vor 17 Minuten</td>
                        <td><i class="material-icons">more_horiz</i></td>
                    </tr>
                    <tr>
                        <td><i class="material-icons">check_box_outline_blank</i></td>
                        <td>
                            <img src="https://dev-talk.net/images/avatars/44/58-446b0bd040e05628ad190369e7ed8317a7d2cfc1.jpg" width="44" height="44">
                            <div class="inliner">
                                <span class="primary-text">ilou</span>
                                <span>info@nodelab-it.de</span>
                            </div>
                        </td>
                        <td>Administrator</td>
                        <td>6132</td>
                        <td>am 04.01.2017, 13:57 Uhr</td>
                        <td>vor 17 Minuten</td>
                        <td><i class="material-icons">more_horiz</i></td>
                    </tr>
                    <tr>
                        <td><i class="material-icons active">check_box</i></td>
                        <td>
                            <img src="https://dev-talk.net/images/avatars/44/58-446b0bd040e05628ad190369e7ed8317a7d2cfc1.jpg" width="44" height="44">
                            <div class="inliner">
                                <span class="primary-text">ilou</span>
                                <span>info@nodelab-it.de</span>
                            </div>
                        </td>
                        <td>Administrator</td>
                        <td>6132</td>
                        <td>am 04.01.2017, 13:57 Uhr</td>
                        <td>vor 17 Minuten</td>
                        <td><i class="material-icons">more_horiz</i></td>
                    </tr>
                </tbody>
            </table>
        </main>
        <aside class="footer-information uppercase">
            3 Mitglieder ausgewählt
        </aside>
    </div>
</template>

<script>
    import { sio } from './main';
    export default {
        data() {
            return {
                user: {
                    username: 'ilou'
                }
            }
        },
        methods: {
            openDialog(dialogId) {
                $(dialogId).removeClass('closed');
            },
            closeDialog(dialogId) {
                $(dialogId).addClass("fade");
                $(dialogId).one('webkitAnimationEnd onanimationend msAnimationEnd', (event) => {
                    $(dialogId).addClass('closed');
                    $(dialogId).removeClass('fade');
                });
            },
        },
        created() {
            sio().on('disconnect', (reason) => {
                this.openDialog('#sio-no-connection');
                sio().on('reconnect', (attemptNumber) => {
                    this.closeDialog('#sio-no-connection');
                });
            });
        }
    }
</script>