<template>
    <div>
        <a class="button" @click="restart()">System neu Starten</a><i class="material-icons spin" id="restart" style="display: none;">refresh</i>
        <br/>
        <br/>
        <a class="button" @click="recompile()">System neu compilen</a><i class="material-icons spin" id="recompile" style="display: none;">refresh</i>
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
                $('#restart').show();
            },
            recompile() {
                sio().emit('cp-recompile-system', {});
                $('#recompile').show();
            }
        },
        created() {
            this.$root.$data.title = this.$options.filters.translate('dashboard');

            sio().on('restart-finished', () => {
                $('#restart').hide();
            });
        }
    }
</script>