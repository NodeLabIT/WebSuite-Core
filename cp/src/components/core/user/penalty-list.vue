<template>
    <div>
        <div class="table-container">
            <!--table>
                <thead class="uppercase">
                <tr>
                    <td class="row-user-1"></td>
                    <td class="row-user-2"></td>
                    <td class="hidden-tiny row-user-3">{{ 'rank' | translate }}</td>
                    <td class="hidden-tiny row-user-4">{{ 'points' | translate }}</td>
                    <td class="hidden-tiny row-user-5">{{ 'registered' | translate }}</td>
                    <td class="row-user-6"></td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user in users">
                    <td>
                        <i class="material-icons" v-if="!isSelected(user.userID)" @click="toggleSelection(user.userID)">check_box_outline_blank</i>
                        <i class="material-icons active" v-if="isSelected(user.userID)" @click="toggleSelection(user.userID)">check_box</i>
                    </td>
                    <td @click="$router.push(`/user/user/edit/${user.userID}`)" class="pointer">
                        <img src="/images/avatars/58-446b0bd040e05628ad190369e7ed8317a7d2cfc1.jpg" width="44" height="44">
                        <div class="inliner">
                            <span class="primary-text">{{ user.username }}</span>
                            <span>{{ user.email }}</span>
                        </div>
                    </td>
                    <td class="hidden-tiny">Administrator</td>
                    <td class="hidden-tiny">6132</td>
                    <td class="hidden-tiny">04.01.2017, 13:57</td>
                    <td @click="dropDown(user.userID);">
                        <i class="material-icons">more_horiz</i>
                        <div class="dropdown" v-bind:id="'dropdown-' + user.userID">
                            test
                        </div>
                    </td>
                </tr>
                </tbody>
            </table-->
            <div class="center-text">
                {{ 'coming-soon' | translate }}
            </div>
        </div>
        <!--div class="pagination">
            <router-link :to="`/user/user/list/${pageID - 1}`" v-if="pageID > 1"><i class="material-icons">navigate_before</i></router-link>
            <a v-if="pageID === 1" class="inactive"><i class="material-icons">navigate_before</i></a>
            Seite {{ pageID }}
            <router-link :to="`/user/user/list/${pageID + 1}`" v-if="pageID * 30 < userCount"><i class="material-icons">navigate_next</i></router-link>
            <a v-if="pageID * 30 > userCount" class="inactive"><i class="material-icons">navigate_next</i></a>
        </div>

        <aside class="footer-information uppercase bg-primary" v-if="selectedUsers.length > 0">
            {{ selectedUsers.length }} {{ 'member-chosen' | translate }}
        </aside>

        <div class="dialog-container closed" id="user-edit">
            <div class="dialog small">
                <div class="dialog-header">
                    <span class="uppercase">{{ 'edit-user' | translate }}</span>
                </div>
                <div class="dialog-body">

                </div>
            </div>
        </div-->
    </div>
</template>

<style>

</style>

<script>
    import { sio } from '../../../main';

    export default {
        data() {
            return {

            }
        },
        created() {
            this.$root.$data.title = this.$options.filters.translate('users-management');
        }
    }
</script>