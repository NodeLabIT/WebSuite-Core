<template>
    <div>
        <h2>{{ 'error' | translate }}: 404</h2>
        <p>{{ '404-description' | translate }} :(</p>
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
            this.$root.$data.title = this.$options.filters.translate('error');
        }
    }
</script>