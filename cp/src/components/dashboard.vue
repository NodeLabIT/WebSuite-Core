<template>
    <div class="extra-margin">
        <a class="button" @click="restart()">{{ "restart-system" | translate }}</a>
        <br/>
        <br/>
        <a class="button" @click="recompile()">{{ "recompile-system" | translate }}</a><i class="material-icons spin" id="recompile" style="display: none;">refresh</i>

        <div class="dialog-container closed" id="system-restart">
            <div class="dialog small">
                <div class="dialog-header">
                    <span class="uppercase">{{ "restarting" | translate }}</span>
                </div>
                <div class="dialog-body">
                    {{ "restart" | translate }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { sio } from "../main";
    export default {
        data() {
            return {

            }
        },
        methods: {
            restart() {
                sio().emit("cp-restart-system", {});
                this.$root.openDialog("#system-restart");
            },
            recompile() {
                sio().emit("cp-recompile-system", {});
                $("#recompile").show();
            }
        },
        created() {
            this.$root.$data.title = this.$options.filters.translate("dashboard");

            sio().on("restart-finished", () => {
                this.$root.closeDialog("#system-restart");
            });
            sio().on("recompile-finished", () => {
                $("#recompile").hide();
            });
        }
    }
</script>