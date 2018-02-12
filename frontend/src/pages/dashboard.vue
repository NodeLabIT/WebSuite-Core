<template>
    <div class="grid" v-show="$root.rendered === true">
        <div class="row">
            <div class="col col3">
                <h4>{{ 'dashboard' | translate }}</h4>
                {{ test }}
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
        beforeRouteEnter(to, from, next) {
            // LOAD DATA AND CALL THAT AFTER SUCCESS
            next(vm => {
                let i = setInterval(() => {
                    if(vm.$children.some((c) => c.loaded === true) === true) {
                        clearInterval(i);
                        vm.$root.rendered = true;
                    }
                }, 200);
            });
        }
    }
</script>