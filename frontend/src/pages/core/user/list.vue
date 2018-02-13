<template>
    <div>
        Mitgliederliste
    </div>
</template>

<script>
    import { sio } from '../../../main';
    export default {
        data() {
            return {

            }
        },
        created() {

        },
        beforeRouteEnter(to, from, next) {
            // LOAD DATA AND CALL THAT AFTER SUCCESS
            next(vm => {
                let i = setInterval(() => {
                    if(vm.$children.length === 0) {
                        clearInterval(i);
                        vm.$root.rendered = true;
                    } else {
                        if(vm.$children.some((c) => c.loaded === true) === true) {
                            clearInterval(i);
                            vm.$root.rendered = true;
                        }
                    }
                }, 200);
            });
        }
    }
</script>