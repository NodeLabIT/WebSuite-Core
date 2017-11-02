<template>
    <div>
        <form>
            <div>
                <input type="text" id="input" class="tiny">
                <label for="input">Titel der Seite</label>
            </div>
            <div>
                <input type="text" id="input2" class="tiny">
                <label for="input2">Slogan der Seite</label>
            </div>
            <div>
                <input type="text" id="input3" class="large">
                <label for="input3">Beschreibung der Seite</label>
            </div>
            <div>
                <input type="text" id="input4" class="large">
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

            }
        },
        methods: {

        },
        created() {
            this.$root.$data.title = this.$options.filters.translate('configuration');

        }
    }
</script>