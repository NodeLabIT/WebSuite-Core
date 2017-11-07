<template>
    <div>
        <a class="floating-button"><i class="material-icons">add</i><span class="text">Mitglied hinzufügen</span></a>
        <div class="table-container">
            <table>
                <thead class="uppercase">
                <tr>
                    <td class="row-1">
                        <a v-if="selectedUsers.length === 0" @click="selectAll()">
                            <i class="material-icons">check_box_outline_blank</i>
                        </a>
                        <a v-if="selectedUsers.length > 0" @click="deselectAll()">
                            <i class="material-icons">indeterminate_check_box</i>
                        </a>
                    </td>
                    <td class="row-2"></td>
                    <td class="hidden-tiny row-3">Rang</td>
                    <td class="hidden-tiny row-4">Punkte</td>
                    <td class="hidden-tiny row-5">registriert</td>
                    <td class="hidden-tiny row-6">letzte aktivität</td>
                    <td class="row-7"></td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user in users">
                    <td>
                        <i class="material-icons" v-if="!isSelected(user.userID)" @click="toggleSelection(user.userID)">check_box_outline_blank</i>
                        <i class="material-icons active" v-if="isSelected(user.userID)" @click="toggleSelection(user.userID)">check_box</i>
                    </td>
                    <td @click="$router.push(`/user/user/${user.userID}`)" class="pointer">
                        <img src="/images/avatars/58-446b0bd040e05628ad190369e7ed8317a7d2cfc1.jpg" width="44" height="44">
                        <div class="inliner">
                            <span class="primary-text">{{ user.username }}</span>
                            <span>{{ user.email }}</span>
                        </div>
                    </td>
                    <td class="hidden-tiny">Administrator</td>
                    <td class="hidden-tiny">6132</td>
                    <td class="hidden-tiny">am 04.01.2017, 13:57 Uhr</td>
                    <td class="hidden-tiny">vor 17 Minuten</td>
                    <td><i class="material-icons">more_horiz</i></td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="pagination">
            <router-link :to="`/user/user-list/${pageID - 1}`" v-if="pageID > 1"><i class="material-icons">navigate_before</i></router-link>
            <a v-if="pageID === 1" class="inactive"><i class="material-icons">navigate_before</i></a>
            Seite {{ pageID }}
            <router-link :to="`/user/user-list/${pageID + 1}`" v-if="pageID * 30 < userCount"><i class="material-icons">navigate_next</i></router-link>
            <a v-if="pageID * 30 > userCount" class="inactive"><i class="material-icons">navigate_next</i></a>
        </div>

        <aside class="footer-information uppercase bg-primary" v-if="selectedUsers.length > 0">
            {{ selectedUsers.length }} Mitglieder ausgewählt
        </aside>
    </div>
</template>

<style>
    .row-1, .row-7 {
        width: 48px;
    }
    @media all and (min-width: 1081px) {
        .row-2 {
            width: calc(40% - 48);
        }
        .row-3 {
            width: 12.5%;
        }
        .row-4 {
            width: 7.5%;
        }
        .row-5 {
            width: calc(20% - 24px);
        }
        .row-6 {
            width: calc(20% - 24px);
        }
    }
    @media all and (max-width: 1081px) {
        .row-2 {
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
                selectedUsers: []
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
            selectAll() {
                for(const user of this.users)
                    this.selectedUsers.push(user.userID);
            },
            deselectAll() {
                for(const user of this.users) {
                    if(this.isSelected(user.userID)) {
                        this.selectedUsers.splice(this.selectedUsers.indexOf(user.userID), 1);
                    }
                }
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
                if(data.err || data.users === undefined) {
                    this.$router.push('/users');
                    return;
                }
                this.userCount = parseInt(data.userCount);
                this.users = data.users;
            });
        }
    }
</script>