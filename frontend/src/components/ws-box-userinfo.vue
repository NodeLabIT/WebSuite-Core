<template>
    <div class="cat-sidebar" id="user-account" v-if="$root.loggedIn">
        <div class="panel-head">
            <h4>{{ $root.user.username }}</h4>
        </div>

        <div class="content">
            <table>
                <tbody>
                    <tr>
                        <td>Beiträge</td>
                        <td>{{ abc }}</td>
                    </tr>
                    <tr>
                        <td>Themen</td>
                        <td>64</td>
                    </tr>
                    <tr>
                        <td>Smiles</td>
                        <td>43</td>
                    </tr>
                </tbody>
            </table>
            <img src="images/profileimg.png">
        </div>
    </div>
    <div class="cat-sidebar" v-else>
        <div class="panel-head">
            <h4>Sie sind nicht angemeldet!</h4>
        </div>
        <div class="content">
            <router-link to="/login" class="mainbutton" style="width: 100%; text-align: center;">Jetzt Anmelden/Registrieren</router-link>
        </div>
    </div>
</template>

<script>
    import { sio } from '../main';

    export default {
        data() {
            return {
                loaded: false,
                abc: 0
            }
        },
        beforeMount() {
            setTimeout(() => {
                this.abc = 112;
                this.loaded = true;
            }, 500);
        }
    }
</script>