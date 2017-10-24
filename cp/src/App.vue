<template>
    <div>
        <header class="header">
            <nav class="primary">
                <div class="left">
                    <router-link to="/" active-class="active" exact>
                        {{ 'dashboard' | translate }}
                    </router-link>
                    <router-link to="/configuration" active-class="active">
                        {{ 'configuration' | translate }}
                    </router-link>
                    <router-link to="/user" active-class="active">
                        {{ 'users' | translate }}
                    </router-link>
                    <router-link to="/applications" active-class="active">
                        {{ 'applications' | translate }}
                    </router-link>
                    <router-link to="/appearance" active-class="active">
                        {{ 'appearance' | translate }}
                    </router-link>
                    <router-link to="/test" active-class="active">
                        {{ 'other' | translate }}
                    </router-link>
                </div>
                <div class="right">
                    <a id="dropdown"><img src="/images/avatars/58-446b0bd040e05628ad190369e7ed8317a7d2cfc1.jpg" width="32" height="32"><i class="material-icons">keyboard_arrow_down</i></a>
                </div>
            </nav>
            <div class="page-title">
                <h1>
                    {{ $root.$data.title }}
                </h1>
            </div>
            <nav class="secondary">
                <router-link to="/dashboard" class="active">
                    Mitglieder
                </router-link>
                <router-link to="/dashboard">
                    Gruppen
                </router-link>
                <router-link to="/dashboard">
                    Sanktionen
                </router-link>
            </nav>
        </header>
        <main class="main">
            <router-view></router-view>
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