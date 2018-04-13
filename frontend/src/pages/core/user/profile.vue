<template>
    <div v-if="err !== null" class="alert error">
        {{ err }}
    </div>
    <div v-else>
        <div class="grid">
            <div class="row">
                <div class="col">
                    <img src="https://preview.msr-webdesign.de/websuite2/images/profileimg.png" height="80px">
                </div>
                <div class="col">
                    <h3>{{ basicInformation.username }}</h3>
                    <h4>{{ basicInformation.groupName }}</h4>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { sio } from '../../../main';
    export default {
        data() {
            return {
                basicInformation: {
                    username: "",
                    groupName: ""
                },
                err: null
            }
        },
        created() {
            this.loadProfile();

            sio().once("user-profile", data => {
                this.$root.rendered = true;
                this.basicInformation = data.basicInformation
            });
        },
        methods: {
            loadProfile() {
                this.err = null;
                if(this.$root.autoLogin === false) {
                    this.$root.$on("loaded", () => {
                        this.__handleProfileRequest();
                    });
                } else {
                    this.__handleProfileRequest();
                }
            },
            __handleProfileRequest() {
                if(typeof this.$route.params.userID !== "undefined" && typeof this.$route.params.username !== "undefined") {
                    sio().emit("user-profile", {userID: this.$route.params.userID, username: this.$route.params.username});
                } else {
                    if(typeof this.$root.user.userID !== "undefined" && typeof this.$root.user.username !== "undefined") {
                        sio().emit("user-profile", {userID: this.$root.user.userID, username: this.$root.user.username});
                    } else {
                        this.err = "Es ist n Fehlerchen beim Laden der Seite aufgetreten: Du bist nicht angemeldet und es wurden keine Nutzer-ID und Nutzername in der URL definiert :(";
                    }
                }
            }
        },
        watch: {
            "$route": "loadProfile"
        }
    }
</script>