<template>
    <div class="grid">
        <div class="row">
            <div class="col col3">
                <h4>{{ 'dashboard' | translate }}</h4>
                <div v-for="box in boxes" :is="box"></div>
            </div>
            <div class="col col1 relative" id="sidebar">
                <div v-for="box in sidebarBoxes" :is="box"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { sio } from '../main';

    export default {
        data() {
            return {
                sidebarBoxes: [
                    "ws-box-userinfo"
                ],
                boxes: [
                    //"ws-box-lastActivity"
                ]
            }
        },
        created() {
            this.i = setInterval(() => {
                if (this.$children.some((c) => c.loaded === true) === true) {
                    clearInterval(this.i);
                    this.$root.rendered = true;
                }
            }, 200);
        },
        beforeDestroy() {
            if(this.i)
                clearInterval(this.i);
        }
    }
</script>