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
                            <input type="text" placeholder="Nutzername / E-Mail-Adresse">
                            <span></span>
                        </div>
                        <br/>
                        <div>
                            <input type="password" placeholder="Passwort">
                            <span></span>
                        </div>
                        <br/>
                        <div>
                            <input type="checkbox" id="stay">
                            <label for="stay" class="checkbox">Angemeldet bleiben</label>
                        </div>
                        <br/>
                        <input type="submit" class="mainbutton" value="Anmelden">
                    </form>
                </div>
                <div class="col col2" style="text-align: center">
                    <div class="maintext">
                        Wenn du einen Account erstellen willst, dann klicke hier
                    </div>
                    <router-link to="/register" class="mainbutton">Hier Registrieren</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { sio } from '../../main';

    export default {
        data() {
            return {

            }
        },
        methods: {

        },
        created() {

        }
    }
</script>