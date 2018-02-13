<template>
    <div>
        <h4>{{ 'userlist' | translate }}</h4>
        <div class="alert error" v-if="err === 'permissionDenied'">
            Du hast keine Rechte diese Seite zu betrachten.
        </div>
        <div class="alert error" v-if="err === 'error occurred'">
            Es ist ein Serverinterner Fehler aufgetreten. Bitte versuche die Seite neu zu laden. Notfalls wende dich an den Betreiber.
        </div>
        <div class="card-list" v-if="users.length > 0">
            <div class="card-item" v-for="user in users">
                <img src="https://preview.msr-webdesign.de/websuite2/images/profileimg.png">
                <table>
                    <tbody>
                        <tr><a href="/" class="card-title">{{ user.username }}</a></tr>
                        <tr><b>{{ user.groupName }}</b></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import { sio } from '../../../main';

    export default {
        data() {
            return {
                users: [],
                err: null
            }
        },
        beforeRouteEnter(to, from, next) {
            sio().emit('userlist', {});
            sio().on('userlist', (data) => {
                next(vm => {
                    if(data.err) {
                        vm.err = data.err;
                        vm.$root.rendered = true;
                        return;
                    }

                    vm.users = data.users;
                    vm.$root.rendered = true;
                });
            });
        },
        beforeRouteLeave(to, from, next) {
            if(this.i)
                clearInterval(this.i);
            next();
        }
    }
</script>