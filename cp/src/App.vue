<template>
    <div>
        <header class="header">
            <nav class="primary">
                <router-link to="/dashboard">
                    {{ 'dashboard' | translate }}
                </router-link>
                <router-link to="/dashboard">
                    {{ 'dashboard' | translate }}
                </router-link>
                <router-link to="/dashboard">
                    {{ 'dashboard' | translate }}
                </router-link>
                <router-link to="/dashboard">
                    {{ 'dashboard' | translate }}
                </router-link>
            </nav>
            <div class="page-title">
                <h1>
                    Mitgliederverwaltung
                </h1>
            </div>
            <nav class="secondary">
                <router-link to="/dashboard" class="active">
                    {{ 'dashboard' | translate }} <span class="badge">4.6k</span>
                </router-link>
                <router-link to="/dashboard">
                    {{ 'dashboard' | translate }} <span class="badge">4.6k</span>
                </router-link>
                <router-link to="/dashboard">
                    {{ 'dashboard' | translate }} <span class="badge">4.6k</span>
                </router-link>
                <router-link to="/dashboard">
                    {{ 'dashboard' | translate }} <span class="badge">4.6k</span>
                </router-link>
            </nav>
        </header>
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