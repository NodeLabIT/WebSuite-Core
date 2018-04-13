<template>
    <span v-if="link.url.startsWith('http://') || link.url.startsWith('https://')">
        <a v-bind:href="link.url" target="_blank" v-if="link.name !== undefined">
            {{ link.name | translate }}
        </a>
        <a v-bind:href="link.url" target="_blank" v-else-if="link.icon !== undefined" class="fa" v-bind:class="link.icon"></a>
    </span>
    <span v-else-if="link.url.startsWith('/')">
        <router-link :to="link.url" v-if="link.name !== undefined" v-bind:class="cssClass">
            {{ link.name | translate }}
        </router-link>
        <router-link :to="link.url" v-else-if="link.icon !== undefined" class="fa" v-bind:class="link.icon, cssClass"></router-link>
    </span>
    <span v-else>
        // ERROR
    </span>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        props: [
            'link',
            'cssClass'
        ],
        created() {

        }
    }
</script>