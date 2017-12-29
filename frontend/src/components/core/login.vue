<template>
    <div>
        <h4>Anmelden oder registrieren</h4>
        <div class="grid">
            <div class="row">
                <div class="col col2">
                    <div class="maintext">
                        Du hast bereits einen Account? Dann melde dich hier an.
                    </div>
                    <br/>
                    <form>
                        <div>
                            <input type="text" v-model="username" placeholder="Nutzername">
                            <span></span>
                        </div>
                        <br/>
                        <div>
                            <input type="password" v-model="password" placeholder="Passwort">
                            <span></span>
                        </div>
                        <br/>
                        <div>
                            <input type="checkbox" v-model="stay" id="stay">
                            <label for="stay" class="checkbox">Angemeldet bleiben</label>
                        </div>
                        <br/>
                        <div style="text-align: center;">
                            <button @click="executeRecaptcha" class="mainbutton">Anmelden</button>
                        </div>
                        <recaptcha ref="recaptcha" @verify="login"></recaptcha>
                    </form>
                </div>
                <div class="col col2" style="text-align: center">
                    <div class="maintext">
                        Erstelle dir jetzt einen Account und erhalte damit Zugriff auf viele Funktionen:
                    </div>
                    <router-link to="/register" class="mainbutton">Hier Registrieren</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { sio } from '../../main';
    import Recaptcha from '../../Recaptcha.vue';

    // TODO: Add https://www.npmjs.com/package/vue-recaptcha

    export default {
        data() {
            return {
                username: "ilou",
                password: "foobar",
                stay: false
            }
        },
        components: { Recaptcha },
        methods: {
            executeRecaptcha() {
                event.preventDefault();
                this.$refs.recaptcha.execute();
            },
            login(response) {
                sio().emit('login', {username: this.username, password: this.password, stay: this.stay, captcha: response});
            }
        },
        created() {

        }
    }
</script>