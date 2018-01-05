<template>
    <div class="dropdown relative" :id="id">
        <a class="pointer relative" @click="dropdown(id)">
            <i v-if="icon" class="fa" :class="icon"></i>
            <span v-if="badge" class="notification-badge">{{ badge }}</span>
            <span v-else>{{ title }}</span>
            <span v-if="badge" class="mobile-only">{{ title }}</span>
        </a>

        <div class="dropdown-content notification" :id="id" v-bind:class="{ 'visible': $root.isDropdownVisible(id) }">
            <h4>{{ title }}</h4>
            <div class="content">
                <slot>Standard</slot>
            </div>
        </div>
    </div>
</template>

<script>
    import { sio } from '../main';

    export default {
        data() {
            return {

            }
        },
        props: [
            'icon',
            'badge',
            'title',
            'id'
        ],
        methods: {
            dropdown(id) {
                if(this.$root.dropdown === id) {
                    this.$root.dropdown = undefined;
                } else {
                    this.$root.dropdown = id;
                }
            }
        }
    }
</script>