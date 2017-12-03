<template>
    <div class="extra-margin">
        <a class="floating-button extra-margin" @click="save()">
            <i class="material-icons">save</i>
            <span class="text">Gruppe hinzufügen</span>
        </a>
        <form>
            <div>
                <input type="text" id="group-name" v-model="defaults.name" class="tiny" v-bind:class="{ valid: $root.isValid(defaults.name) }" />
                <label for="group-name" class="floating-label">{{ 'group-name' | translate }}</label>
            </div>
            <div>
                <input type="text" id="group-description" v-model="defaults.description" class="large" v-bind:class="{ valid: $root.isValid(defaults.description) }" />
                <label for="group-description" class="floating-label">{{ 'group-description' | translate }}</label>
            </div>
            <div>
                <input type="text" id="group-displayname" v-model="defaults.displayname" class="tiny" v-bind:class="{ valid: $root.isValid(defaults.displayname) }" />
                <label for="group-displayname" class="floating-label">{{ 'group-displayname' | translate }}</label>
            </div>
            <div>
                <input type="text" id="group-displaycolor" v-model="defaults.displaycolor" class="tiny" v-bind:class="{ valid: $root.isValid(defaults.displaycolor) }" />
                <label for="group-displaycolor" class="floating-label">{{ 'group-displaycolor' | translate }}</label>
            </div>

            <div v-for="(value, category) in aPermissions">
                {{ category | translate }}
                <ul style="list-style-type: none;" v-for="(vl, permission) in value">
                    <li><input type="checkbox" v-model="permissions" :value="permission"> {{ permission | translate }}</li>
                </ul>
            </div>
        </form>
    </div>
</template>

<style>

</style>

<script>
    import { sio } from '../../../main';

    export default {
        data() {
            return {
                defaults: {},
                aPermissions: {},
                permissions: []
            }
        },
        methods: {
            save() {
                sio().emit('cp-group-add', {defaults, permissions});
            }
        },
        created() {
            this.$root.$data.title = this.$options.filters.translate('users-management');
            sio().emit('cp-group-add-permissions', {});

            sio().on('cp-group-add-permissions', data => {
                this.aPermissions = JSON.parse(data);
            });

            sio().on('cp-group-add', data => {

            });
        }
    }
</script>