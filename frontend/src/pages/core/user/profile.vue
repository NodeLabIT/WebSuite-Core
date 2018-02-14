<template>
    <div>

    </div>
</template>

<script>
    import { sio } from '../../../main';
    export default {
        data() {
            return {

            }
        },
        created() {
            this.loadProfile();

            sio().on('user-profile', data => {

            });

            sio().on('user-profile-redirect-info', data => {
                this.$router.push(`/user/profile/${data.userID}-${data.username}`);
            });
        },
        methods: {
            loadProfile() {
                if(this.$root.autoLogin === false) {
                    this.$root.$on("auto-loaded", () => {
                        this.__handleProfileRequest();
                    });
                } else {
                    this.__handleProfileRequest();
                }
            },
            __handleProfileRequest() {
                if(this.$route.params.userID && this.$route.params.username) {
                    sio().emit('user-profile', {userID: this.$route.params.userID, username: this.$route.params.username});
                }

                if(this.$route.params.userID && !this.$route.params.username) {
                    sio().emit('user-profile-redirect-info', {userID: this.$route.params.userID});
                }

                if(!this.$route.params.userID && this.$route.params.username) {
                    sio().emit('user-profile-redirect-info', {username: this.$route.params.username});
                }

                if(!this.$route.params.userID && !this.$route.params.username) {
                    sio().emit('user-profile', {userID: this.$root.user.userID, username: this.$root.user.username});
                }
            }
        },
        watch: {
            '$route': 'loadProfile'
        }
    }
</script>