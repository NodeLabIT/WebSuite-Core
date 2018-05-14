<template>
	<div>
		<h4>{{ "userlist" | translate }}</h4>
		<div class="alert error" v-if="err === 'permissionDenied'">
			Du hast keine Rechte diese Seite zu betrachten.
		</div>
		<div class="alert error" v-if="err === 'error occurred'">
			Es ist ein Serverinterner Fehler aufgetreten. Bitte versuche die Seite neu zu laden. Notfalls wende dich an
			den Betreiber.
		</div>
		<div class="card-list" v-if="users.length > 0">
			<div class="card-item card-link" v-for="user in users" @onclick="">
				<img src="https://preview.msr-webdesign.de/websuite2/images/profileimg.png">
				<table>
					<tbody>
					<tr>
						<router-link :to="userUrl(user.userID, user.username)" class="card-title">{{ user.username }}
						</router-link>
					</tr>
					<tr><b>{{ user.groupName }}</b></tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	import {sio} from "../../../main";

	export default {
		data() {
			return {
				users: [],
				err: null
			};
		},
		created() {
			if (this.$root.autoLogin === false) {
				this.$root.$on("loaded", () => {
					sio().emit("user-list", {});
				});
			} else {
				sio().emit("user-list", {});
			}

			sio().on("user-list", (data) => {
				if (data.err) {
					this.err = data.err;
					this.$root.rendered = true;
					return;
				}

				this.users = data.users;
				this.$root.rendered = true;
			});
		},
		watch: {
			"$route": () => {
				sio().emit("user-list", {});
			}
		},
		methods: {
			userUrl(userID, username) {
				return `/user/profile/${userID}-${this.$root.$options.filters.urlify(username)}`;
			}
		}
	};
</script>