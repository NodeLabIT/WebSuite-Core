<template>
    <div>
        <a class="button" @click="restart()">Neu Starten</a>
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
            restart() {
                sio().emit('cp-restart-system', {});
            }
        },
        created() {
            this.$root.$data.title = this.$options.filters.translate('dashboard');
        }
    }
</script>