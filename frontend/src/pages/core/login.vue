<template>
    <div>
        <h4>Anmelden</h4>
        <div class="grid">
            <div class="row">
                <div class="col col2">
                    <div class="maintext">
                        Du hast bereits einen Account? Dann melde dich hier an.
                    </div>
                    <div class="alert error" v-if="err !== undefined"><b>Beim anmelden ist ein Fehler aufgetreten:</b><br/>
                        <span v-if="err.step != -1">
                            Die angegebenen Daten sind falsch -.- Bitte überprüfe deine Eingabe.
                        </span>
                    </div>
                    <br/>
                    <form class="relative">
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

    export default {
        data() {
            return {
                username: "ilou",
                password: "foobar",
                stay: false,
                err: undefined,
                logging: ""
            }
        },
        components: { Recaptcha },
        methods: {
            executeRecaptcha() {
                event.preventDefault();
                this.$refs.recaptcha.execute();
            },
            login(response) {
                this.err = undefined;
                if(!this.logging) {
                    this.logging = response;
                    sio().emit('login', {username: this.username, password: this.password, stay: this.stay, captcha: response});
                }
            }
        },
        created() {
            sio().on('login', (data) => {
                this.logging = "";
                if(data.err) {
                    this.err = {
                        err: data.err.message,
                        step: data.step
                    }
                }
            });
        }
    }
</script>