<template>
    <div>
        <!--a class="floating-button"><i class="material-icons">add</i><span class="text">{{ 'add-member' | translate }}</span></a-->
        <div class="table-container">
            <table>
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
            </table>
            <div class="center-text" v-if="users.length === 0">
                {{ 'no-user-exists' | translate }}
            </div>
        </div>
        <div class="pagination">
            <router-link :to="`/user/user-list/${pageID - 1}`" v-if="pageID > 1"><i class="material-icons">navigate_before</i></router-link>
            <a v-if="pageID === 1" class="inactive"><i class="material-icons">navigate_before</i></a>
            Seite {{ pageID }}
            <router-link :to="`/user/user-list/${pageID + 1}`" v-if="pageID * 30 < userCount"><i class="material-icons">navigate_next</i></router-link>
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
        </div>
    </div>
</template>

<style>
    .row-user-1, .row-user-6 {
        width: 48px;
    }
    @media all and (min-width: 1081px) {
        .row-user-2 {
            width: calc(45% - 48);
        }
        .row-user-3 {
            width: 15%;
        }
        .row-user-4 {
            width: 10%;
        }
        .row-user-5 {
            width: calc(30% - 24px);
        }
    }
    @media all and (max-width: 1081px) {
        .row-user-2 {
            width: calc(100% - 96px);
        }
    }
</style>

<script>
    import { sio } from '../../../main';

    export default {
        data() {
            return {
                pageID: 0,
                userCount: 0,
                users: {},
                selectedUsers: [],
                edit: {}
            }
        },
        methods: {
            getUserList() {
                sio().emit('cp-user-list', {page: this.pageID});
            },
            updatePageID() {
                if(this.$route.params.pageID) {
                    if(parseInt(this.$route.params.pageID)) {
                        this.pageID = parseInt(this.$route.params.pageID);
                    } else {
                        this.pageID = 1;
                    }
                } else {
                    this.pageID = 1;
                }
            },
            isSelected(userID) {
                return this.selectedUsers.includes(userID);
            },
            toggleSelection(userID) {
                if(this.isSelected(userID)) {
                    this.selectedUsers.splice(this.selectedUsers.indexOf(userID), 1);
                } else {
                    this.selectedUsers.push(userID);
                }
            },
            dropDown(userID) {
                $(`#dropdown-${userID}`).toggle();
            },
            userEdit(userID) {
                sio().emit('user-edit', {userID});
                this.$root.openDialog('#user-edit');
            }
        },
        watch: {
            '$route' (to, from) {
                this.updatePageID();
                this.getUserList();
            }
        },
        created() {
            this.$root.$data.title = this.$options.filters.translate('users-management');
            this.updatePageID();
            this.getUserList();

            sio().on('cp-user-list', data => {
                if(data.users === undefined) {
                    return;
                }

                this.userCount = parseInt(data.userCount);
                this.users = data.users;
            });
        }
    }
</script>