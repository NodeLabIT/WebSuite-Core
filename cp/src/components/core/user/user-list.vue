<template>
    <div>
        <a class="floating-button"><i class="material-icons">add</i></a>
        <table>
            <thead class="uppercase">
                <tr>
                    <td style="width: 48px;"><i class="material-icons">indeterminate_check_box</i></td>
                    <td style="width: calc(40% - 48);"></td>
                    <td style="width: 12.5%;">Rang</td>
                    <td style="width: 7.5%;">Punkte</td>
                    <td style="width: calc(20% - 24px);">registriert</td>
                    <td style="width: calc(20% - 24px);">letzte aktivität</td>
                    <td style="width: 48px;"></td>
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
                    <td>Administrator</td>
                    <td>6132</td>
                    <td>am 04.01.2017, 13:57 Uhr</td>
                    <td>vor 17 Minuten</td>
                    <td><i class="material-icons">more_horiz</i></td>
                </tr>
            </tbody>
        </table>
        <div class="pagination">
            <router-link :to="`/user/user-list/${pageID - 1}`" v-if="pageID > 1"><i class="material-icons">navigate_before</i></router-link>
            <a v-if="pageID === 1" class="inactive"><i class="material-icons">navigate_before</i></a>
            Seite {{ pageID }}
            <router-link :to="`/user/user-list/${pageID + 1}`" v-if="pageID * 30 < userCount"><i class="material-icons">navigate_next</i></router-link>
            <a v-if="pageID * 30 > userCount" class="inactive"><i class="material-icons">navigate_next</i></a>
        </div>

        <aside class="footer-information uppercase" v-if="selectedUsers.length > 0">
            {{ selectedUsers.length }} Mitglieder ausgewählt
        </aside>
    </div>
</template>

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