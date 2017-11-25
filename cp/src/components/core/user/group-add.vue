<template>
    <div>

    </div>
</template>

<style>

</style>

<script>
    import { sio } from '../../../main';

    export default {
        data() {
            return {

            }
        },
        methods: {

        },
        created() {
            this.$root.$data.title = this.$options.filters.translate('users-management');

        }
    }
</script>