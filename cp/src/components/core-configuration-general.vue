<template>
    <div>
        <form>
            <div>
                <input type="text" id="input" v-model="username" class="tiny" v-bind:class="{ valid: $root.isValid(username) }" />
                <label for="input">Titel der Seite</label>
            </div>
            <div>
                <input type="text" id="input2" v-model="username2" class="tiny" v-bind:class="{ valid: $root.isValid(username2) }" />
                <label for="input2">Slogan der Seite</label>
            </div>
            <div>
                <input type="text" id="input3" class="large" v-model="username3" v-bind:class="{ valid: $root.isValid(username3) }" />
                <label for="input3">Beschreibung der Seite</label>
            </div>
            <div>
                <input type="text" id="input4" class="large" v-model="username4" v-bind:class="{ valid: $root.isValid(username4) }" />
                <label for="input4">Test</label>
            </div>
        </form>
    </div>
</template>

<script>
    import { sio } from '../main';
    export default {
        data() {
            return {
                username: "",
                username2: "",
                username3: "",
                username4: ""
            }
        },
        methods: {

        },
        created() {
            this.$root.$data.title = this.$options.filters.translate('configuration');

        }
    }
</script>