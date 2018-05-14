<template>
	<div v-if="err !== null" class="alert error">
		{{ err }}
	</div>
	<div v-else>
		<div class="grid">
			<div class="row" id="centered">
				<div class="col">
					<img class="profile-avatar" src="https://preview.msr-webdesign.de/websuite2/images/profileimg.png"
						 width="100px" height="100px">
				</div>
				<div class="col">
					<h3>{{ basicInformation.username }}</h3>
					<h4>{{ basicInformation.groupName }}</h4>
				</div>
			</div>
		</div>
		<div>
			<h4>Über mich</h4>
		</div>
	</div>
</template>

<style>
	.profile-avatar {
		border-radius: 100%;
	}

	@media all and (max-width: 1110px) {
		#centered {
			text-align: center;
		}
	}
</style>

<script>
	import {sio} from "../../../main";

	export default {
		data() {
			return {
				basicInformation: {
					username: "",
					groupName: ""
				},
				err: null
			};
		},
		created() {
			this.loadProfile();

			sio().once("user-profile", data => {
				this.$root.rendered = true;
				this.basicInformation = data.basicInformation;
			});
		},
		beforeUpdate() {
			this.loadProfile();

			sio().once("user-profile", data => {
				this.$root.rendered = true;
				this.basicInformation = data.basicInformation;
			});
		},
		methods: {
			loadProfile() {
				this.err = null;
				if (this.$root.autoLogin === false) {
					this.$root.$on("loaded", () => {
						this.__handleProfileRequest();
					});
				} else {
					this.__handleProfileRequest();
				}
			},
			__handleProfileRequest() {
				if (typeof this.$route.params.userID !== "undefined" && typeof this.$route.params.username !== "undefined") {
					sio().emit("user-profile", {
						userID: this.$route.params.userID,
						username: this.$route.params.username
					});
				} else {
					if (typeof this.$root.user.userID !== "undefined" && typeof this.$root.user.username !== "undefined") {
						sio().emit("user-profile", {
							userID: this.$root.user.userID,
							username: this.$root.user.username
						});
					} else {
						this.$root.rendered = true;
						this.err = "Es ist ein Fehler beim Laden der Seite aufgetreten: Du bist nicht angemeldet und es wurden keine Nutzer-ID und Nutzername in der URL definiert :(";
					}
				}
			}
		},
		watch: {
			"$route": "loadProfile"
		}
	};
</script>