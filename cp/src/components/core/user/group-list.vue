<template>
    <div>
        <a class="floating-button"><i class="material-icons">add</i><span class="text">{{ 'add-group' | translate }}</span></a>
        <div class="table-container">
            <table>
                <thead class="uppercase">
                <tr>
                    <td class="row-group-1"></td>
                    <td class="hidden-tiny row-group-2">{{ 'member-count' | translate }}</td>
                    <td class="row-group-3"></td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="group in groups">
                    <td @click="$router.push(`/user/group/edit/${group.groupID}`)" class="pointer">
                        <div class="inliner">
                            <span class="primary-text">{{ group.groupName }}</span>
                            <span class="hidden-tiny">{{ group.groupDescription }}</span>
                        </div>
                    </td>
                    <td class="hidden-tiny">{{ getUserCount(group.groupID) }}</td>
                    <td><i class="material-icons">more_horiz</i></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style>
    .row-group-3 {
        width: 48px;
    }
    @media all and (min-width: 1081px) {
        .row-group-1 {
            width: calc(100% - 198px);
        }
        .row-group-2 {
            width: 150px;
        }
    }
    @media all and (max-width: 1081px) {
        .row-group-1 {
            width: calc(100% - 48px);
        }
        .row-group-2 {
            display: none;
        }
    }
</style>

<script>
    import { sio } from '../../../main';

    export default {
        data() {
            return {
                counts: [],
                groups: {}
            }
        },
        methods: {
            getUserCount(groupID) {
                return this.counts[groupID].count;
            }
        },
        created() {
            this.$root.$data.title = this.$options.filters.translate('users-management');
            sio().emit('cp-group-list', {});

            sio().on('cp-group-list', data => {
                if(data.groups === undefined) {
                    return;
                }
                this.counts = data.counts;
                this.groups = data.groups;
            });
        }
    }
</script>