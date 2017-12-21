<template>
    <div class="extra-margin">
        <a class="floating-button extra-margin" @click="save()">
            <i class="material-icons">save</i>
            <span class="text">Gruppe hinzufügen</span>
        </a>
        <form>
            <div>
                <input type="text" id="group-name" v-model="defaults.groupName" class="tiny" v-bind:class="{ valid: $root.isValid(defaults.groupName) }" />
                <label for="group-name" class="floating-label">{{ 'group-name' | translate }}</label>
            </div>
            <div>
                <input type="text" id="group-description" v-model="defaults.groupDescription" class="large" v-bind:class="{ valid: $root.isValid(defaults.groupDescription) }" />
                <label for="group-description" class="floating-label">{{ 'group-description' | translate }}</label>
            </div>
            <div>
                <input type="text" id="group-displayname" v-model="defaults.displayName" class="tiny" v-bind:class="{ valid: $root.isValid(defaults.displayName) }" />
                <label for="group-displayname" class="floating-label">{{ 'group-displayname' | translate }}</label>
            </div>
            <div>
                <input type="text" id="group-displaycolor" v-model="defaults.displayColor" class="tiny" v-bind:class="{ valid: $root.isValid(defaults.displayColor) }" />
                <label for="group-displaycolor" class="floating-label">{{ 'group-displaycolor' | translate }}</label>
            </div>
            <div>
                <input type="text" id="group-fontcolor" v-model="defaults.fontColor" class="tiny" v-bind:class="{ valid: $root.isValid(defaults.fontColor) }" />
                <label for="group-fontcolor" class="floating-label">{{ 'group-fontcolor' | translate }}</label>
            </div>

            <div v-for="(value, category) in availablePermissions.cp">
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
                groupID: 0,
                defaults: {},
                availablePermissions: {},
                permissions: []
            }
        },
        methods: {
            updateGroupID() {
                if(this.$route.params.groupID) {
                    if(parseInt(this.$route.params.groupID)) {
                        this.groupID = parseInt(this.$route.params.groupID);
                        return;
                    }
                }
                this.groupID = 1;
            },
            save() {
                sio().emit('cp-save-group-edit', {defaults: this.defaults, permissions: this.permissions});
            }
        },
        created() {
            this.updateGroupID();
            this.$root.$data.title = this.$options.filters.translate('users-management');
            sio().emit('cp-group-add-permissions', {});

            sio().on('cp-group-add-permissions', data => {
                this.availablePermissions = data;
            });

            sio().emit('cp-group-edit', {groupID: this.groupID});

            sio().on('cp-group-edit', data => {
                this.defaults = data.defaults;
                this.permissions = data.permissions;
            });
        }
    }
</script>