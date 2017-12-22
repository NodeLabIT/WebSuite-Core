<template>
    <div>
        <div class="center-text">
            {{ 'coming-soon' | translate }}
        </div>
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
        created() {
            this.$root.$data.title = this.$options.filters.translate('users-management');
        }
    }
</script>